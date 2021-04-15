import { useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';
import styles from './VideoPage.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

export function VideoPage() {
  const { videoID } = useParams();

  const { videos, videoDispatch, likedVideos, watchLater } = useData();

  const isLiked = likedVideos.find((video) => video.id === videoID);

  const inWatchLater = watchLater.find((video) => video.id === videoID);

  const video = videos.find((video) => video.id === videoID);

  const { name, views, channelThumbnail, channel, subscribers } = video;

  return (
    <>
      {video ? (
        <div className={styles.container}>
          <div className={styles.videocontainer}>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullscreen="allowfullscreen"></iframe>
          </div>
          <div className={styles.videodescription}>
            <div className={styles.video}>
              <div className={styles.title}>
                <h2>{name}</h2>
              </div>
              <div className={styles.views}>{views} views</div>
            </div>
            <div className={styles.actions}>
              <span onClick={() => videoDispatch({ type: 'TOGGLE_LIKED_VIDEO', payload: video })}>{!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon color="secondary" />}</span>
              <span>Add to playlist</span>
              <span onClick={() => videoDispatch({ type: 'TOGGLE_WATCH_LATER', payload: video })}>{inWatchLater ? <WatchLaterOutlinedIcon /> : <WatchLaterIcon color="secondary" />}</span>
            </div>
          </div>
          <div className={styles.channel}>
            <div className={styles.channelimage}>
              <img src={channelThumbnail} alt={name} />
            </div>
            <div className={styles.channeldescription}>
              <div className={styles.channelname}>{channel}</div>
              <div className={styles.channelsubscribers}>{subscribers}</div>
            </div>
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
}
