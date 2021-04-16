/*
 * ------------TODO------------
 * Video controls for save to playlist
 */

// import { useState } from 'react';
import { useData } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './VideoCard.module.css';

export function VideoCard({ video }) {
  const { id, name, channel, videoThumbnail, views } = video;
  const { videoDispatch } = useData();

  // const [playlistName, setplaylistName] = useState('');

  return (
    <div key={id} className={styles.container}>
      <Link to={`/${id}`} className={styles.link}>
        <div onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: video })}>
          <img src={videoThumbnail} className={styles.image} alt={name} />
        </div>
      </Link>

      <div className={styles.description}>
        <Link to={`/${id}`} className={styles.link}>
          <h3 className={styles.title} onClick={() => videoDispatch({ type: 'ADD_VIDEO_TO_HISTORY', payload: video })}>
            {name}
          </h3>
        </Link>
        <p className={styles.channel}>
          {channel} &bull; {views} views
        </p>
      </div>

      {/* <p> {time} </p> */}
      {/* <button onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{toggleWatchLaterText(id)}</button> */}
      {/* <button onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video })}>{toggleLikeButtonText(id)}</button> */}

      {/* {playlist.map((playlistItem) => {
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
      </button> */}
    </div>
  );
}
