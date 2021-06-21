import { useData } from '../../../context';
import styles from './PlaylistPageVideoCard.module.css';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from 'react';
import { toggleWatchLater, addToWatchHistory, removeVideoFromPlaylist } from '../../../services';

export function PlaylistPageVideoCard({ video, playlistID }) {
  const { videoDispatch, watchLater } = useData();
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const [moreModal, showMoreModal] = useState(false);
  const navigate = useNavigate();
  const isInWatchLater = watchLater?.find((video) => video._id === id);
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  return (
    <div>
      <div key={id} className={styles.playlistPageVideoCardContainer}>
        <div
          className={styles.imageContainer}
          onClick={() => {
            navigate(`/${id}`);
            addToWatchHistory(id, videoDispatch, video);
          }}
        >
          <img src={videoThumbnail} alt={name} className={styles.image} />
        </div>
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
  );
}
