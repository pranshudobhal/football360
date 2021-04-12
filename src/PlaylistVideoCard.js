import React from 'react';
import { useData } from './dataContext';
import { Link } from 'react-router-dom';

/*
 *   PlaylistVideoCard is used to render different videos within a playlist
 */

export function PlaylistVideoCard({ videoID, playlistID }) {
  const { videos, videoDispatch, toggleWatchLaterText, toggleLikeButtonText } = useData();

  const videoItem = videos.find((video) => video.id === videoID);

  const { id, name, url, channel, thumbnail, views, time } = videoItem;

  return (
    <div
      key={id}
      style={{
        border: '1px solid #4B5563',
        borderRadius: '0 0 0.5rem 0.5rem',
        margin: '1rem',
        maxWidth: '50%',
        padding: '0 0 1rem',
      }}
    >
      <Link to={`/${id}`}>
        <a href={url} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: videoItem })}>
          <img src={thumbnail} width="100%" height="auto" alt={name} />
        </a>
        <h3> {name} </h3>
      </Link>
      <div> {views} </div>
      <div> {channel} </div>
      <div> {time} </div>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: videoItem })}>{toggleWatchLaterText(id)}</button>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: videoItem })}>{toggleLikeButtonText(id)}</button>

      <button onClick={() => videoDispatch({ type: 'REMOVE_VIDEO_FROM_PLAYLIST', payload: { videoID, playlistID } })}>Remove video from playlist</button>
    </div>
  );
}
