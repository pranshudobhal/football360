import { PlaylistVideoCard } from './PlaylistVideoCard';
import { useData } from '../../../context';
import { useRef, useState } from 'react';

/*
 *   PlaylistCard is used to render different playlists
 */

export function PlaylistCard({ playlistItem }) {
  const { id, name, videos } = playlistItem;
  const { videoDispatch } = useData();
  const [playlistName, setPlaylistName] = useState(name);
  const [isEditable, setIsEditable] = useState(false);
  const playlistInput = useRef(null);

  function editPlaylistName() {
    if (!isEditable) {
      playlistInput.current.focus();
    } else {
      videoDispatch({
        type: 'UPDATE_PLAYLIST_NAME',
        payload: { id, name: playlistName },
      });
    }
    setIsEditable((isEditable) => !isEditable);
  }

  return (
    <div>
      <input type="text" value={playlistName} readOnly={!isEditable} ref={playlistInput} onChange={(e) => setPlaylistName(() => e.target.value)} />
      <button onClick={() => editPlaylistName()}>{!isEditable ? 'Edit' : 'Save'}</button>
      <button onClick={() => videoDispatch({ type: 'DELETE_PLAYLIST', payload: playlistItem })}>Delete Playlist</button>
      <p>
        {videos.map((videoID) => (
          <PlaylistVideoCard videoID={videoID} playlistID={id} />
        ))}
      </p>
    </div>
  );
}
