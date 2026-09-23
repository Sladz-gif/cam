'use client';

import type { LocationType } from './DisplayArea';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ location }: { location: LocationType }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div
      className="
        h-full
        w-full
        min-h-0
        flex
        flex-col
        px-3.5
        sm:px-5
        md:px-7
        py-3.5
        sm:py-4.5
        md:py-5
        overflow-hidden
      "
    >
      <div className="w-full h-full max-w-5xl mx-auto flex flex-col gap-2.5 sm:gap-3 min-h-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              aria-hidden="true"
              className="shrink-0 w-[3px] h-5 rounded-full bg-[#0b3d91]"
            />
            <p
              className="
                text-[10px]
                sm:text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#475569]
              "
            >
              Video Broadcast
            </p>
            <div
              className="
                hidden
                sm:flex
                items-center
                gap-1.5
                px-2
                py-0.5
                rounded
                border
                border-[#0b3d91]/25
                bg-[#0b3d91]/[0.05]
                text-[#092f70]
                text-[10px]
                font-semibold
                font-mono
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
                aria-hidden="true"
              >
                <path d="M12 22s-7-7.58-7-12a7 7 0 0 1 14 0c0 4.42-7 12-7 12Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {location} Feed
            </div>
          </div>
          <div
            className="
              flex
              items-center
              gap-1.5
              px-2
              py-0.5
              rounded
              text-[10px]
              sm:text-[11px]
              font-medium
              bg-[#0b3d91]
              text-white
            "
          >
            <span
              aria-hidden="true"
              className={`inline-block w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-white/90 animate-pulse' : 'bg-amber-300'}`}
            />
            {isPlaying ? 'ON AIR' : 'PAUSED'}
          </div>
        </div>

        <div
          className="
            flex-1
            min-h-0
            w-full
            rounded-lg
            border
            border-[#0f172a]/20
            bg-black
            overflow-hidden
            shadow-[0_10px_30px_-12px_rgba(15,23,42,0.4)]
            relative
            group/video
          "
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              controls={false}
              autoPlay
              muted
              playsInline
              poster=""
              preload="metadata"
              className="
                max-w-full
                max-h-full
                w-full
                h-full
                object-contain
                bg-black
              "
            >
              <source src="/videos/sample.mp4" type="video/mp4" />
              Your browser does not support embedded HTML5 video.
            </video>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              aria-pressed={!isPlaying}
              className="
                absolute
                top-3
                right-3
                sm:top-3.5
                sm:right-3.5
                inline-flex
                items-center
                justify-center
                w-10
                h-10
                rounded-full
                bg-white/95
                text-[#0b3d91]
                border
                border-white/60
                shadow-[0_4px_14px_-4px_rgba(15,23,42,0.5)]
                backdrop-blur-[2px]
                hover:bg-white
                hover:scale-105
                active:translate-y-[1px]
                transition-all
                duration-[120ms]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                z-10
              "
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[18px] h-[18px]"
                  aria-hidden="true"
                >
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[18px] h-[18px] translate-x-[1px]"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.77-6.86a1 1 0 0 0 0-1.68L9.54 4.3C8.87 3.87 8 4.35 8 5.14Z" />
                </svg>
              )}
            </button>
            <div
              className="
                absolute
                bottom-0
                inset-x-0
                p-3
                sm:p-4
                pointer-events-none
                bg-gradient-to-t
                from-black/60
                via-black/10
                to-transparent
              "
              aria-hidden="true"
            />
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-1
            text-[10px]
            sm:text-[11px]
            text-[#475569]
            font-mono
          "
        >
          <p className="truncate">Controls · Play/Pause on-display · Native Transport + Volume CC</p>
        </div>
      </div>
    </div>
  );
}
