import Image from 'next/image';
import { urlFor, getRatio, sanityLoader } from '@helpers/image-tools';

export default function Img(props) {
  const { media, fit = 'cover', sizes, loading } = props || {};
  const { image, alt } = media || {};

  const assetRef = image?.asset?._ref;
  if (!assetRef) return null;
  const ratio = getRatio(image);
  const blurUrl = urlFor(image).width(30).blur(30).auto('format').url();

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: ratio,
        height: `${fit == 'cover' ? '100%' : 'auto'}`,
        width: '100%',
        overflow: 'hidden',
       /* backgroundImage: `url(${blurUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',*/
      }}
    >
      <Image
        loader={sanityLoader}
        src={assetRef}        
        alt={alt || 'project image'}
        placeholder="blur"
        blurDataURL={blurUrl}
     
        fill
        sizes={sizes || '100vw'}

        style={{ objectFit: fit, display: 'block' }}
        loading={loading || 'lazy'}
      
        quality={80}
      />
    </div>
  );
}
