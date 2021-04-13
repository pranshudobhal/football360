import { useData } from '../../context';

import { PlaylistCard } from './components/PlaylistCard';

export function Playlist() {
  const { playlist } = useData();

  return (
    <>
      <h1>Playlists</h1>
      <div className="App">
        {playlist.map((playlistItem) => (
          <PlaylistCard playlistItem={playlistItem} />
        ))}
      </div>
    </>
  );
}
