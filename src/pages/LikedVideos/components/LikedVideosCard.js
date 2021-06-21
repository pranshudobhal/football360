import { useData } from '../../../context';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './LikedVideosCard.module.css';
import { useState } from 'react';
import { toggleLikedVideos, addToWatchHistory, toggleWatchLater } from '../../../services';

export function LikedVideosCard({ video }) {
  const { _id: id, name, channel, videoThumbnail, views } = video;
  const { videoDispatch, likedVideos, watchLater } = useData();
  const [moreModal, showMoreModal] = useState(false);
  const navigate = useNavigate();
  const isInLikedVideos = likedVideos?.find((video) => video._id === id);
  const isInWatchLater = watchLater?.find((video) => video._id === id);
  const toggleModal = () => showMoreModal((moreModal) => !moreModal);

  return (
    <div>
      <div key={id} className={styles.likedVideosCardContainer}>
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
                      toggleLikedVideos(id, isInLikedVideos, videoDispatch, video);
                    }}
                  >
                    {isInLikedVideos ? 'Remove from Liked Videos' : 'Add to Liked Videos'}
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
