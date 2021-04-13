import { useState } from 'react';
import { useData } from '../../../context';
import { Link } from 'react-router-dom';

export function VideoCard({ video }) {
  const { id, name, url, channel, thumbnail, views, time } = video;
  const { videoDispatch, toggleWatchLaterText, toggleLikeButtonText, playlist } = useData();

  const [playlistName, setplaylistName] = useState('');

  return (
    <div
      key={id}
      style={{
        border: '1px solid #4B5563',
        borderRadius: '0 0 0.5rem 0.5rem',
        margin: '1rem',
        maxWidth: '20%',
        padding: '0 0 1rem',
      }}
    >
      <Link to={`/${id}`}>
        <a href={url} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: video })}>
          <img src={thumbnail} width="100%" height="auto" alt={name} />
          <h3> {name} </h3>
        </a>
      </Link>
      <div> {views} </div>
      <div> {channel} </div>
      <div> {time} </div>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{toggleWatchLaterText(id)}</button>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video })}>{toggleLikeButtonText(id)}</button>

      {playlist.map((playlistItem) => {
        return <div onClick={() => videoDispatch({ type: 'ADD_TO_PLAYLIST', payload: { playlistID: playlistItem.id, videoID: id } })}>{playlistItem.name}</div>;
      })}

      <input type="text" value={playlistName} onChange={(e) => setplaylistName(e.target.value)} />
      <button
        onClick={() => {
          videoDispatch({ type: 'CREATE_PLAYLIST', payload: { playlistName, id } });
          setplaylistName('');
        }}
      >
        Create playlist
      </button>
    </div>
  );
}
