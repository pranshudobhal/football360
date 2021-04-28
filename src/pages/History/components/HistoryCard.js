import { useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './HistoryCard.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';

export function HistoryCard({ video }) {
  const { id, name, url, channel, videoThumbnail, views } = video;
  const { videoDispatch, watchLater } = useData();
  const [moreModal, showMoreModal] = useState(false);
  const isInWatchLater = watchLater.find((video) => video.id === id);

  return (
    <Link to={`/${id}`} className={styles.link}>
      <div key={id} className={styles.historyCardContainer}>
        <div className={styles.imageContainer}>
          <a href={url} className={styles.imageAnchor} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: video })}>
            <img src={videoThumbnail} alt={name} className={styles.image} />
          </a>
        </div>
        <div className={styles.descriptionContainer}>
          <h3> {name} </h3>
          <p className={styles.channelName}> {channel} </p>
          <p className={styles.views}> {views} views </p>
        </div>
        <div onClick={(e) => e.preventDefault()} className={styles.action}>
          <span onClick={() => showMoreModal((moreModal) => !moreModal)}>
            <MoreVertIcon style={{ color: 'rgb(17, 17, 17, 0.5)' }} />
          </span>
          {moreModal && (
            <div className={styles.modalCloseContainer} onClick={() => showMoreModal((moreModal) => !moreModal)}>
              <div
                className={styles.moreContainer}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <ul>
                  <li onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}</li>
                  <li
                    onClick={() => {
                      console.log('clicked');
                      showMoreModal((moreModal) => !moreModal);
                    }}
                  >
                    Cancel
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
