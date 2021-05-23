/**
 * PlaylistCard is used to render different playlists
 */

import { PlaylistVideoCard } from './PlaylistVideoCard';
import styles from './PlaylistCard.module.css';
import { useNavigate } from 'react-router';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

export function PlaylistCard({ playlistItem }) {
  const { id, name, videos } = playlistItem;

  const navigate = useNavigate();

  return (
    <div className={styles.playlistCardContainer}>
      <div className={styles.playlistName}>
        <h3>{name}</h3>
        <span onClick={() => navigate(`/playlist/${id}`)}>
          <OpenInNewIcon />
        </span>
      </div>
      <div className={styles.container}>
        {videos.length === 0 ? (
          <div className={styles.emptyContainer}>No vidoes in this playlist</div>
        ) : (
          <div className={styles.videoContainer}>
            {videos.map((videoID) => (
              <PlaylistVideoCard key={videoID} videoID={videoID} playlistID={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
