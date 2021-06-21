import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useData } from '../../context';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from './PlaylistPage.module.css';
import { PlaylistPageVideoCard } from './components/PlaylistPageVideoCard';
import { Header, Navbar, Loader } from '../../components';
import { deletePlaylist, updatePlaylistName } from '../../services';

export function PlaylistPage() {
  const { playlistID } = useParams();
  const { playlists, videoDispatch } = useData();
  const playlist = playlists?.find((playlistItem) => playlistItem._id === playlistID);
  const [isEditable, setIsEditable] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistInput = useRef(null);
  const navigate = useNavigate();

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
        updatePlaylistName(_id, videoDispatch, playlistName);
      }
      setIsEditable((isEditable) => !isEditable);
    }

    return (
      <>
        <Header />
        <Navbar />
        <div className={styles.playlistPageContainer}>
          <div className={styles.playlistName}>
            <input type="text" defaultValue={name} readOnly={!isEditable} ref={playlistInput} onChange={(e) => setPlaylistName(() => e.target.value)} />
            <div className={styles.actions}>
              <span onClick={() => editPlaylistName()}>{!isEditable ? <EditOutlinedIcon style={{ fontSize: 25 }} /> : <DoneIcon style={{ fontSize: 25 }} />}</span>
              <span onClick={() => deletePlaylist(_id, navigate, videoDispatch)}>
                <DeleteOutlineIcon style={{ fontSize: 25 }} />
              </span>
            </div>
          </div>

          <div className={styles.container}>
            {videos?.map((video) => (
              <PlaylistPageVideoCard key={video._id} video={video} playlistID={_id} />
            ))}
            {videos?.length === 0 && (
              <div className={styles.noVideosInPlaylist}>
                <h3>No vidoes in this playlist</h3>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Navbar />
        <Loader />
      </>
    );
  }
}
