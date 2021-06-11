import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from './PlaylistPage.module.css';
import { PlaylistPageVideoCard } from './components/PlaylistPageVideoCard';
import axios from 'axios';

export function PlaylistPage() {
  const { playlistID } = useParams();
  const { playlists, videoDispatch } = useData();
  const playlist = playlists?.find((playlistItem) => playlistItem._id === playlistID);
  const [isEditable, setIsEditable] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistInput = useRef(null);
  const navigate = useNavigate();

  const deletePlaylist = async (playlistID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/playlist/${playlistID}`);

      if (response.status === 200) {
        videoDispatch({ type: 'DELETE_PLAYLIST', payload: playlistID });
        navigate('/playlist');
      }
    } catch (error) {
      console.error('Error deleting playlist', error);
    }
  };

  const updatePlaylistName = async (playlistID) => {
    try {
      const response = await axios.post(`http://localhost:3000/playlist/${playlistID}`, { playlistName: playlistName });
      console.log('line 36 response ', response);
      if (response.status === 200) {
        videoDispatch({ type: 'UPDATE_PLAYLIST_NAME', payload: { playlistID, name: playlistName } });
      }
    } catch (error) {
      console.error('Error updating playlist name', error);
    }
  };

  useEffect(() => {
    const isPlaylistPresent = playlists?.some((playlist) => playlist._id === playlistID);

    !isPlaylistPresent && playlists && navigate('/*');

    setPlaylistName(playlist?.name);
  }, [playlists]);

  if (playlist) {
    const { _id, name, videos } = playlist;

    function editPlaylistName() {
      if (!isEditable) {
        playlistInput.current.focus();
      } else {
        updatePlaylistName(_id);
      }
      setIsEditable((isEditable) => !isEditable);
    }

    return (
      <div className={styles.playlistPageContainer}>
        <div className={styles.playlistName}>
          <input type="text" defaultValue={name} readOnly={!isEditable} ref={playlistInput} onChange={(e) => setPlaylistName(() => e.target.value)} />
          <div className={styles.actions}>
            <span onClick={() => editPlaylistName()}>{!isEditable ? <EditOutlinedIcon style={{ fontSize: 25 }} /> : <DoneIcon style={{ fontSize: 25 }} />}</span>
            <span onClick={() => deletePlaylist(_id)}>
              <DeleteOutlineIcon style={{ fontSize: 25 }} />
            </span>
          </div>
        </div>

        <div className={styles.container}>
          {videos?.map((video) => (
            <PlaylistPageVideoCard key={video._id} video={video} playlistID={_id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>loading</h1>;
  }
}
