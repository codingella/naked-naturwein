import { urlFor, getDimensions } from '../../../helpers/image-tools'
import style from './Image.module.css';
import Image from 'next/image'

export default function Img (props) {
  const {media, fit, sizes, loading} = props || undefined;
  const {image, alt} = media || undefined;
  if(!image) return;

  const url = urlFor(image).url()
  const blurUrl = urlFor(image).width(30).blur(30).url();
  const { imgWidth, imgHeight, ratio } = getDimensions(image);
  
  return (
    <div 
    className={style.container}
    style={{
        backgroundImage: `url(${blurUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Image
            className={style.Image}
            src={url}
            loading={loading || "lazy"}
           placeholder={'blur'}
            blurDataURL={blurUrl}
            alt={alt || 'project image'}
            width={imgWidth}
            height={imgHeight}
            quality={80}
            style={{ objectFit: `${fit}`/* objectPosition: imgPos*/ }}
            sizes={sizes || '100vw'}
        />
    </div>
  )
}
