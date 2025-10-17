'use client'
import { useRef, useState } from 'react';
import MuxPlayer from "@mux/mux-player-react";
import { motion } from 'framer-motion';

const Video = (props) => {
  const {media, quality='medium', loop = true, fit = 'cover'} = props
  const asset = media?.video?.asset || {}
  const { data, playbackId, thumbTime = 0 } = asset || {};

  const ref = useRef();
  const [status, setStatus] = useState({ canPlay: false });
  //const { width } = useContext(SizeContext);


  // Calculate the video's aspect ratio.
 /* const getVideoRatio = (data) => {
    const [w, h] = data?.aspect_ratio.split(':');
    return parseInt(w) / parseInt(h);
  };

  const ratio = getVideoRatio(data);*/

 /* If the video is allowed to play (either via viewport or external prop), call play.
  useEffect(() => {
    if (status?.canPlay && ref.current) {
      ref.current.play();
    }
    
  }, [status?.canPlay]);*/

  /* Optional: if using the "shouldPlay" prop from the parent, force play when true.
  useEffect(() => {
    if (shouldPlay && status?.canPlay && ref.current) {
      ref.current.play();
    }
  }, [shouldPlay, status?.canPlay]);*/

  return (
    <>
      <motion.div
        style={{
          opacity: status.canPlay ? 1 : 0,
          transition: 'opacity 0.5s ease',
          height: '100%',
          width: '100%',
        }}
        // This will trigger when the element is within the viewport or within the margin.
      /* onViewportEnter={() => {
          if (status?.canPlay && ref.current) {
            ref.current.play();
          }
        }}
        onViewportLeave={() => {
          if (status?.canPlay && ref.current) {
            ref.current.pause();
          }
        }}*/
        // Adjust the margin so that adjacent slides (prev/next) are considered in view.
        viewport={{ amount: 0.66, margin: "200px" }}
        className="Video"
      >

        <MuxPlayer
            preload="none"
            disableCookies
            ref={ref}
            autoplay='false' //"muted"
            loop={loop}
            nohotkeys
            muted="true"
            playsInline
            streamType="on-demand"
            quality={quality || 'medium'}
            player-init-time={0}
            playbackRates={[1]}
            style={{ '--media-object-fit': fit }}
            playbackId={playbackId}
            thumbnailTime={thumbTime}
            onCanPlay={() => setStatus((prev) => ({ ...prev, canPlay: true }))}
          />
    
      </motion.div>

      <style jsx global>{`
        mux-player {
          --seek-live-button: none;
          --seek-backward-button: none;
          --seek-forward-button: none;
          --center-controls: none;
          --captions-button: none;
          --airplay-button: none;
          --pip-button: none;
          --cast-button: none;
          --playback-rate-button: none;
          --volume-range: none;
          --rendition-selectmenu: none;
          --controls: none;
          --media-control-padding: 1rem !important;
          overflow: hidden;
          width:100%;
          height: 100%;
        }

        .Video {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow:hidden;
        }
        
      `}</style>
    </>
  );
};

export default Video;
