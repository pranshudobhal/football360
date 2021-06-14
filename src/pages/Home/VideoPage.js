import { useState } from 'react';
import { useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';
import styles from './VideoPage.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from 'axios';
import { Header, Navbar } from '../../components';

export function VideoPage() {
  const { videoID } = useParams();
  const [playlistModal, showPlaylistModal] = useState(false);
  const [playlistName, setplaylistName] = useState('');
  const { videos, videoDispatch, likedVideos, watchLater, playlists } = useData();
  const isInLikedVideos = likedVideos?.find((video) => video._id === videoID);
  const isInWatchLater = watchLater?.find((video) => video._id === videoID);

  const isInPlaylist = (playlistID) => {
    const playlist = playlists?.find((playlistItem) => playlistItem._id === playlistID);
    return playlist?.videos.find((video) => video._id === videoID) ? true : false;
  };

  const video = videos?.find((video) => video._id === videoID);

  const toggleLikedVideos = async (videoID) => {
    try {
      let response;
      if (isInLikedVideos) {
        response = await axios.delete(`http://localhost:3000/likedvideo/${videoID}`);
      } else {
        response = await axios.post(`http://localhost:3000/likedvideo/${videoID}`);
      }

      if (response.status === 200) {
        videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video });
      }
    } catch (error) {
      console.error('Error toggling in Liked Videos ', error);
    }
  };

  const toggleWatchLater = async (videoID) => {
    try {
      let response;
      if (isInWatchLater) {
        response = await axios.delete(`http://localhost:3000/watchlater/${videoID}`);
      } else {
        response = await axios.post(`http://localhost:3000/watchlater/${videoID}`);
      }

      if (response.status === 200) {
        videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video });
      }
    } catch (error) {
      console.error('Error toggling in watch later ', error);
    }
  };

  const toggleVideoInPlaylist = async (playlistID, videoID) => {
    try {
      let response;

      if (isInPlaylist(playlistID)) {
        response = await axios.delete(`http://localhost:3000/playlist/${playlistID}/${videoID}`);
      } else {
        response = await axios.post(`http://localhost:3000/playlist/${playlistID}/${videoID}`);
      }

      if (response.status === 200) {
        videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { video, playlistID } });
      }
    } catch (error) {
      console.error('Error toggling in playlist', error);
    }
  };

  const createNewPlaylist = async () => {
    if (playlistName !== '') {
      const response = await axios.post('http://localhost:3000/playlist/', { videoID: videoID, playlistName: playlistName });

      if (response.status === 200) {
        videoDispatch({ type: 'CREATE_PLAYLIST', payload: { _id: response.data.newPlaylist._id, playlistName, video } });
        setplaylistName('');
      }
    }
  };

  if (video) {
    const { _id, id, name, views, channelThumbnail, channel, subscribers } = video;

    return (
      <>
        <Header />
        <Navbar />
        <div className={styles.container}>
          <div className={styles.videocontainer}>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
          </div>
          <div className={styles.videodescription}>
            <div className={styles.video}>
              <div className={styles.title}>
                <h2>{name}</h2>
              </div>
              <div className={styles.views}>{views} views</div>
            </div>
            <div className={styles.actions}>
              <div className={styles.tooltip} onClick={() => toggleLikedVideos(_id)}>
                <span className={styles.tooltiptext}>{isInLikedVideos ? 'Remove from Liked Videos' : 'Add to Liked Videos'}</span>
                {!isInLikedVideos ? <FavoriteBorderIcon /> : <FavoriteIcon color="secondary" />}
              </div>
              <div className={styles.tooltip} onClick={() => toggleWatchLater(_id)}>
                <span className={styles.tooltiptext}>{isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}</span>
                {!isInWatchLater ? <WatchLaterOutlinedIcon /> : <WatchLaterIcon color="secondary" />}
              </div>
              <div className={`${styles.playlist} ${styles.tooltip}`}>
                <span className={styles.tooltiptext}>Add to Playlist</span>
                <span onClick={() => showPlaylistModal((playlistModal) => !playlistModal)}>
                  <PlaylistAddIcon />
                </span>
                {playlistModal && (
                  <div className={styles.playlistmodal}>
                    <ul>
                      {playlists?.map((playlistItem, index) => (
                        <li key={index}>
                          <input id={playlistItem._id} checked={isInPlaylist(playlistItem._id)} type="checkbox" onChange={() => toggleVideoInPlaylist(playlistItem._id, _id)} />
                          <label htmlFor={playlistItem._id}>{playlistItem.name}</label>
                        </li>
                      ))}
                      <li key="playlistinput">
                        <input
                          type="text"
                          value={playlistName}
                          onChange={(e) => {
                            setplaylistName(e.target.value);
                          }}
                        />
                        <span onClick={() => createNewPlaylist()}>Create</span>
                      </li>
                    </ul>
                    <div
                      className={styles.closemodal}
                      onClick={() => {
                        showPlaylistModal((playlistModal) => !playlistModal);
                        setplaylistName('');
                      }}
                    >
                      <span>Close</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.channel}>
            <div className={styles.channelimage}>
              <img src={channelThumbnail} alt={name} />
            </div>
            <div className={styles.channeldescription}>
              <div className={styles.channelname}>{channel}</div>
              <div className={styles.channelsubscribers}>{subscribers}</div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Navbar />
        <Error404 />
      </>
    );
  }
}
