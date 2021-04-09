import React from 'react';
import { useData } from './dataContext';
import { Link } from 'react-router-dom';

export function HistoryCard({ video }) {
  const { id, name, url, channel, thumbnail, views, time } = video;
  const { videoDispatch, toggleWatchLaterText, toggleLikeButtonText } = useData();

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
        </a>
        <h3> {name} </h3>
      </Link>
      <div> {views} </div>
      <div> {channel} </div>
      <div> {time} </div>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{toggleWatchLaterText(id)}</button>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video })}>{toggleLikeButtonText(id)}</button>
    </div>
  );
}
