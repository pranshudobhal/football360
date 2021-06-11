import { useData } from '../../../context';
import styles from './PlaylistPageVideoCard.module.css';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import axios from 'axios';

export function PlaylistPageVideoCard({ video, playlistID }) {
  const { videoDispatch, watchLater } = useData();
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const [moreModal, showMoreModal] = useState(false);
  const navigate = useNavigate();
  const isInWatchLater = watchLater?.find((video) => video._id === id);
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  const removeVideoFromPlaylist = async (playlistID, videoID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/playlist/${playlistID}/${videoID}`);

      if (response.status === 200) {
        videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { video, playlistID } });
      }
    } catch (error) {
      console.error('Error removing video from playlist', error);
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

  const addToWatchHistory = async (videoID) => {
    try {
      const response = await axios.post(`http://localhost:3000/history/${videoID}`);

      if (response.status === 200) {
        videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video });
      }
    } catch (error) {
      console.error('Error adding to watch history ', error);
    }
  };

  return (
    <div>
      <div key={id} className={styles.playlistPageVideoCardContainer}>
        <div
          className={styles.imageContainer}
          onClick={() => {
            navigate(`/${id}`);
            addToWatchHistory(id);
          }}
        >
          <img src={videoThumbnail} alt={name} className={styles.image} />
        </div>
        <div className={styles.descriptionContainer}>
          <h3
            onClick={() => {
              navigate(`/${id}`);
              addToWatchHistory(id);
            }}
          >
            {name}
          </h3>
          <p className={styles.channelName}> {channel} </p>
          <p className={styles.views}> {views} views </p>
        </div>
        <div className={styles.action}>
          <span onClick={toggleModal}>
            <MoreVertIcon style={{ color: 'rgb(17, 17, 17, 0.5)' }} />
          </span>
          {moreModal && (
            <div className={styles.modalCloseContainer} onClick={() => showMoreModal((moreModal) => !moreModal)}>
              <div
                className={styles.moreContainer}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ul>
                  <li
                    onClick={() => {
                      toggleModal();
                      toggleWatchLater(id);
                    }}
                  >
                    {isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
                  </li>
                  <li
                    onClick={() => {
                      toggleModal();
                      removeVideoFromPlaylist(playlistID, id);
                    }}
                  >
                    Remove video from playlist
                  </li>
                  <li onClick={toggleModal}>Cancel</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
