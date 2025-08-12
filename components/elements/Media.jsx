import Img from './image/Image'
import Vimeo from './Vimeo'
import VimeoThumbnail from './VimeoThumbnail'

// 👇 Dynamically import the client-only Vimeo component

const Media = (props) => {
const {media, thumbnail} = props;
  const {type, video, image} = media || null;

 // console.log(thumbnail)

  return (
    <> 
      {
        (type == 'image' && image) &&
        <Img {...props} />
      }
      {
        (type == 'video' && video && !thumbnail) &&
        <Vimeo {...props} />
      }
      {
        (type == 'video' && video && thumbnail) &&
        <VimeoThumbnail {...props} />
      }
    </>
  );
};

export default Media;
