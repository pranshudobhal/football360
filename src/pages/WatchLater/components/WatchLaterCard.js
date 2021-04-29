import { useNavigate } from 'react-router-dom';
import { useData } from '../../../context';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './WatchLaterCard.module.css';
import { useState } from 'react';

export function WatchLaterCard({ video }) {
  const { id, name, url, channel, videoThumbnail, views } = video;
  const { videoDispatch, watchLater } = useData();
  const [moreModal, showMoreModal] = useState(false);
  const isInWatchLater = watchLater.find((video) => video.id === id);
  const navigate = useNavigate();
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  return (
    <div>
      <div key={id} className={styles.watchLaterCardContainer}>
        <div className={styles.imageContainer} onClick={() => navigate(`/${id}`)}>
          <a href={url} className={styles.imageAnchor} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: video })}>
            <img src={videoThumbnail} alt={name} className={styles.image} />
          </a>
        </div>
        <div className={styles.descriptionContainer} onClick={() => navigate(`/${id}`)}>
          <h3> {name} </h3>
          <p className={styles.channelName}> {channel} </p>
          <p className={styles.views}> {views} views </p>
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
                      videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video });
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
