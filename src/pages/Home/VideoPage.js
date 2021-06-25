import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useAuth, useData } from '../../context';
import { Error404 } from '../Error/Error404';
import styles from './VideoPage.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Header, Loader, Navbar } from '../../components';
import { toggleVideoInPlaylist, toggleLikedVideos, toggleWatchLater, createNewPlaylist } from '../../services';

export function VideoPage() {
  const { videoID } = useParams();
  const [playlistModal, showPlaylistModal] = useState(false);
  const [playlistName, setplaylistName] = useState('');
  const { videos, videoDispatch, likedVideos, watchLater, playlists } = useData();
  const isInLikedVideos = likedVideos?.find((video) => video._id === videoID);
  const isInWatchLater = watchLater?.find((video) => video._id === videoID);
  const { token } = useAuth();
  const navigate = useNavigate();

  const isInPlaylist = (playlistID) => {
    const playlist = playlists?.find((playlistItem) => playlistItem._id === playlistID);
    return playlist?.videos.find((video) => video._id === videoID) ? true : false;
  };

  const video = videos?.find((video) => video._id === videoID);

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
              <div className={styles.tooltip} onClick={() => toggleLikedVideos(_id, isInLikedVideos, videoDispatch, video)}>
                <span className={styles.tooltiptext}>{isInLikedVideos ? 'Remove from Liked Videos' : 'Add to Liked Videos'}</span>
                {!isInLikedVideos ? <FavoriteBorderIcon /> : <FavoriteIcon color="secondary" />}
              </div>
              <div className={styles.tooltip} onClick={() => toggleWatchLater(_id, isInWatchLater, videoDispatch, video)}>
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
                    {token ? (
                      <>
                        <ul>
                          {playlists?.map((playlistItem, index) => (
                            <li key={index}>
                              <input id={playlistItem._id} checked={isInPlaylist(playlistItem._id)} type="checkbox" onChange={() => toggleVideoInPlaylist(playlistItem._id, _id, isInPlaylist, videoDispatch, video)} />
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
                            <span onClick={() => createNewPlaylist(playlistName, videoDispatch, videoID, video, setplaylistName)}>Create</span>
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
                      </>
                    ) : (
                      <ul>
                        <li>Sign in to access playlist</li>
                        <div className={styles.closemodal} onClick={() => navigate('/login')}>
                          <span>Sign In</span>
                        </div>
                      </ul>
                    )}
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
  } else if (videos === null) {
    return (
      <>
        <Header />
        <Navbar />
        <Loader />
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
