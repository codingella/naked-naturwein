import Img from './Image'
import Video from './Video'

const Media = (props) => {
const {media} = props;
  const {type, video, image} = media || null;

  return (
    <> 
      {
        (type == 'image' && image) &&
        <Img {...props} />
      }
      {
        (type == 'video' && video) &&
        <Video {...props} />
      }
    </>
  );
};

export default Media;
