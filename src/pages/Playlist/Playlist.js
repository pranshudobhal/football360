import { useData } from '../../context';

import { PlaylistCard } from './components/PlaylistCard';

export function Playlist() {
  const { playlists } = useData();

  return (
    <>
      <h1>Playlists</h1>
      <div className="App">
        {playlists.map((playlistItem) => (
          <PlaylistCard playlistItem={playlistItem} />
        ))}
      </div>
    </>
  );
}
