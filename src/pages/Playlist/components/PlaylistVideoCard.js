import { useData } from '../../../context';
import { Link } from 'react-router-dom';

/*
 *   PlaylistVideoCard is used to render different videos within a playlist
 */

export function PlaylistVideoCard({ videoID, playlistID }) {
  const { videos, videoDispatch, likedVideos, watchLater } = useData();
  const videoItem = videos.find((video) => video.id === videoID);
  const { id, name, url, channel, videoThumbnail, views, time } = videoItem;
  const isInLikedVideos = likedVideos.find((video) => video.id === id);
  const isInWatchLater = watchLater.find((video) => video.id === id);

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
          <img src={videoThumbnail} width="100%" height="auto" alt={name} />
        </a>
        <h3> {name} </h3>
      </Link>
      <p> {views} </p>
      <p> {channel} </p>
      <p> {time} </p>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: videoItem })}>{isInWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}</button>
      <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: videoItem })}>{isInLikedVideos ? 'Remove from Liked Videos' : 'Add to Liked Videos'}</button>
      <button onClick={() => videoDispatch({ type: 'REMOVE_VIDEO_FROM_PLAYLIST', payload: { videoID, playlistID } })}>Remove video from playlist</button>
    </div>
  );
}
