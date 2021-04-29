import { useData } from '../../context';
import { PlaylistCard } from './components/PlaylistCard';
import styles from './PlaylistListing.module.css';

export function PlaylistListing() {
  const { playlists } = useData();

  return (
    <div className={styles.playlistListingContainer}>
      <div className={styles.heading}>
        <h1>Playlists</h1>
      </div>
      <div className={styles.container}>
        {playlists.map((playlistItem) => (
          <PlaylistCard playlistItem={playlistItem} />
        ))}
      </div>
    </div>
  );
}
