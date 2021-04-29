/**
 * PlaylistVideoCard is used to render different videos within a playlist
 */

import { useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './PlaylistVideoCard.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';

export function PlaylistVideoCard({ videoID, playlistID }) {
  const { videos, videoDispatch, watchLater } = useData();
  const videoItem = videos.find((video) => video.id === videoID);
  const { id, name, url, channel, videoThumbnail } = videoItem;
  const isInWatchLater = watchLater.find((video) => video.id === id);
  const [moreModal, showMoreModal] = useState(false);

  return (
    <Link to={`/${id}`} className={styles.link}>
      <div key={id} className={styles.playlistVideoCardContainer}>
        <div className={styles.imageContainer}>
          <a href={url} className={styles.imageAnchor} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: videoItem })}>
            <img src={videoThumbnail} alt={name} className={styles.image} />
          </a>
        </div>
        <div className={styles.container}>
          <div className={styles.descriptionContainer}>
            <h3> {name} </h3>
            <p className={styles.channelName}> {channel} </p>
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
                    <li onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: videoItem })}>{isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}</li>
                    <li onClick={() => videoDispatch({ type: 'TOGGLE_VIDEO_IN_PLAYLIST', payload: { videoID, playlistID } })}>Remove video from playlist</li>
                    <li onClick={() => showMoreModal((moreModal) => !moreModal)}>Cancel</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
