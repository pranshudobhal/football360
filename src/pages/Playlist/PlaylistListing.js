import { useData } from '../../context';
import { PlaylistCard } from './components/PlaylistCard';
import styles from './PlaylistListing.module.css';
import { Loader } from '../../components';

export function PlaylistListing() {
  const { playlists } = useData();

  return (
    <div className={styles.playlistListingContainer}>
      <div className={styles.heading}>
        <h1>Playlists</h1>
      </div>
      <div className={styles.container}>
        {playlists === null ? (
          <Loader />
        ) : (
          <>
            {playlists?.map((playlistItem, index) => (
              <PlaylistCard key={index} playlistItem={playlistItem} />
            ))}
            {playlists?.length === 0 && (
              <div className={styles.noPlaylist}>
                <h3>Create some playlists to show them here</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
