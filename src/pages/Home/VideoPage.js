import { useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';

export function VideoPage() {
  const { videoID } = useParams();

  const { videos } = useData();

  const isValid = videos.find((video) => video.id === videoID);

  return (
    <div>
      {isValid ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullscreen="allowfullscreen"></iframe> : <Error404 />}
    </div>
  );
}
