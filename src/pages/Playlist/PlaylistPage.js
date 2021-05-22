import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from './PlaylistPage.module.css';
import { PlaylistPageVideoCard } from './components/PlaylistPageVideoCard';

export function PlaylistPage() {
  const { playlistID } = useParams();
  const { playlists, videoDispatch } = useData();
  const playlist = playlists?.find((playlistItem) => playlistItem.id === playlistID);
  const [isEditable, setIsEditable] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistInput = useRef(null);

  if (playlist) {
    const { id, videos } = playlist;

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
      <div className={styles.playlistPageContainer}>
        <div className={styles.playlistName}>
          <input type="text" value={playlistName} readOnly={!isEditable} ref={playlistInput} onChange={(e) => setPlaylistName(() => e.target.value)} />
          <div className={styles.actions}>
            <span onClick={() => editPlaylistName()}>{!isEditable ? <EditOutlinedIcon style={{ fontSize: 25 }} /> : <DoneIcon style={{ fontSize: 25 }} />}</span>
            <span onClick={() => videoDispatch({ type: 'DELETE_PLAYLIST', payload: playlist })}>
              <DeleteOutlineIcon style={{ fontSize: 25 }} />
            </span>
          </div>
        </div>

        <div className={styles.container}>
          {videos.map((videoID) => (
            <PlaylistPageVideoCard key={videoID} videoID={videoID} />
          ))}
        </div>
      </div>
    );
  } else {
    return <Error404 />;
  }
}
