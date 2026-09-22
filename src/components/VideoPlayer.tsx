'use client';

import type { LocationType } from './DisplayArea';

export default function VideoPlayer({ location }: { location: LocationType }) {
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
              className="inline-block w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"
            />
            ON AIR
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
          "
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              controls
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
              {/*
                To use a real video:
                  1. Drop your file at public/videos/sample.mp4 in this project, OR
                  2. Replace the src below with an absolute/remote URL.
                The <source> below points at /videos/sample.mp4 by default; Next.js
                will serve it from the public folder. If missing, browsers will
                simply show the native controls with no stream — no runtime error.
              */}
              <source src="/videos/sample.mp4" type="video/mp4" />
              Your browser does not support embedded HTML5 video.
            </video>
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
          <p className="truncate">Controls · Native HTML5 · Transport + Volume CC</p>
        </div>
      </div>
    </div>
  );
}
