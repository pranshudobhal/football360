import { PlaylistVideoCard } from './PlaylistVideoCard';
import { useData } from '../../../context';
import { useRef, useState } from 'react';
import styles from './PlaylistCard.module.css';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useNavigate } from 'react-router';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

/*
 *   PlaylistCard is used to render different playlists
 */

export function PlaylistCard({ playlistItem }) {
  const { id, name, videos } = playlistItem;
  const { videoDispatch } = useData();
  const [playlistName, setPlaylistName] = useState(name);
  const [isEditable, setIsEditable] = useState(false);
  const playlistInput = useRef(null);
  const navigate = useNavigate();
  console.log(id);

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
    <div className={styles.playlistCardContainer}>
      <div className={styles.playlistName}>
        <h3>{playlistName}</h3>
        <span onClick={() => navigate(`/playlist/${id}`)}>
          <OpenInNewIcon />
        </span>
      </div>
      <div className={styles.container}>
        {videos.length === 0 ? (
          <div className={styles.emptyContainer}>No vidoes in this playlist</div>
        ) : (
          <div className={styles.videoContainer}>
            {videos.map((videoID) => (
              <PlaylistVideoCard videoID={videoID} playlistID={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* <span onClick={() => editPlaylistName()}>{!isEditable ? <EditOutlinedIcon /> : <DoneIcon />}</span>
<span onClick={() => videoDispatch({ type: 'DELETE_PLAYLIST', payload: playlistItem })}>
  <DeleteOutlineIcon />
</span> */
// <input type="text" value={playlistName} readOnly={!isEditable} ref={playlistInput} onChange={(e) => setPlaylistName(() => e.target.value)} />
