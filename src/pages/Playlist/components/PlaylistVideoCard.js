/**
 * PlaylistVideoCard is used to render different videos within a playlist
 */

import { useData } from '../../../context';
import { useNavigate } from 'react-router-dom';
import styles from './PlaylistVideoCard.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';

export function PlaylistVideoCard({ videoID, playlistID }) {
  const { videos, videoDispatch, watchLater } = useData();
  const videoItem = videos.find((video) => video.id === videoID);
  const { id, name, channel, videoThumbnail } = videoItem;
  const isInWatchLater = watchLater.find((video) => video.id === id);
  const [moreModal, showMoreModal] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  return (
    <div>
      <div key={id} className={styles.playlistVideoCardContainer}>
        <div
          className={styles.imageContainer}
          onClick={() => {
            navigate(`/${id}`);
            videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: videoItem });
          }}
        >
          <img src={videoThumbnail} alt={name} className={styles.image} />
        </div>
        <div className={styles.container}>
          <div className={styles.descriptionContainer}>
            <h3
              onClick={() => {
                navigate(`/${id}`);
                videoDispatch({ type: 'ADD_VIDEO_TO_WATCH_HISTORY', payload: videoItem });
              }}
            >
              {name}
            </h3>
            <p className={styles.channelName}> {channel} </p>
          </div>
          <div className={styles.action}>
            <span onClick={toggleModal}>
              <MoreVertIcon style={{ color: 'rgb(17, 17, 17, 0.5)' }} />
            </span>
            {moreModal && (
              <div className={styles.modalCloseContainer} onClick={toggleModal}>
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
                        videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: videoItem });
                      }}
                    >
                      {isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
                    </li>
                    <li
                      onClick={() => {
                        toggleModal();
                        videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { videoID, playlistID } });
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
    </div>
  );
}
