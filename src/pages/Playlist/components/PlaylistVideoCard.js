/**
 * PlaylistVideoCard is used to render different videos within a playlist
 */

import { useData } from '../../../context';
import { useNavigate } from 'react-router-dom';
import styles from './PlaylistVideoCard.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import { toggleWatchLater, addToWatchHistory, removeVideoFromPlaylist } from '../../../services';

export function PlaylistVideoCard({ video, playlistID }) {
  const { videoDispatch, watchLater } = useData();
  const { _id: id, name, channel, videoThumbnail } = video;
  const isInWatchLater = watchLater?.find((video) => video._id === id);
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
            addToWatchHistory(id, videoDispatch, video);
          }}
        >
          <img src={videoThumbnail} alt={name} className={styles.image} />
        </div>
        <div className={styles.container}>
          <div className={styles.descriptionContainer}>
            <h3
              onClick={() => {
                navigate(`/${id}`);
                addToWatchHistory(id, videoDispatch, video);
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
                        toggleWatchLater(id, isInWatchLater, videoDispatch, video);
                      }}
                    >
                      {isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
                    </li>
                    <li
                      onClick={() => {
                        toggleModal();
                        removeVideoFromPlaylist(playlistID, id, videoDispatch, video);
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
