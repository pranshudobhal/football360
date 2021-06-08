import { useData } from '../../../context';
import styles from './PlaylistPageVideoCard.module.css';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import axios from 'axios';

export function PlaylistPageVideoCard({ videoID }) {
  const { videos, videoDispatch, watchLater } = useData();
  const video = videos.find((video) => video._id === videoID);
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const [moreModal, showMoreModal] = useState(false);
  const navigate = useNavigate();
  const isInWatchLater = watchLater?.find((video) => video._id === id);
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  const toggleWatchLater = async (id) => {
    try {
      let response;
      if (isInWatchLater) {
        response = await axios.delete(`http://localhost:3000/watchlater/${id}`);
      } else {
        response = await axios.post(`http://localhost:3000/watchlater/${id}`);
      }

      if (response.status === 200) {
        videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video });
      }
    } catch (error) {
      console.error('Error toggling in watch later ', error);
    }
  };

  return (
    <div>
      <div key={id} className={styles.playlistPageVideoCardContainer}>
        <div
          className={styles.imageContainer}
          onClick={() => {
            navigate(`/${id}`);
            videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video });
          }}
        >
          <img src={videoThumbnail} alt={name} className={styles.image} />
        </div>
        <div className={styles.descriptionContainer}>
          <h3
            onClick={() => {
              navigate(`/${id}`);
              videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: video });
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
