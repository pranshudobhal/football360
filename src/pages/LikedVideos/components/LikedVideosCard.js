import { useData } from '../../../context';

export function LikedVideosCard({ video }) {
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
      <a href={url}>
        <img src={thumbnail} width="100%" height="auto" alt={name} />
      </a>
      <h3> {name} </h3>
      <div> {views} </div>
      <div> {channel} </div>
      <div> {time} </div>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{toggleWatchLaterText(id)}</button>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video })}>{toggleLikeButtonText(id)}</button>
    </div>
  );
}
