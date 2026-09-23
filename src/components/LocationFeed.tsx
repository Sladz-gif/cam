'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LocationType } from './DisplayArea';

const LOCATIONS: LocationType[] = [
  'Birim',
  'Koforidua',
  'Tinga',
  'Sefwi',
  'Tarkwa',
];

interface FeedImage {
  url: string;
  caption: string;
  meta: string;
}

const FEED: Record<LocationType, FeedImage[]> = {
  Birim: [
    {
      url: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80',
      caption: 'Birim forest canopy — southern sector patrol',
      meta: '08:14 · CAM-02 · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80',
      caption: 'River Birim upstream monitoring station',
      meta: '08:42 · CAM-05 · clear · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
      caption: 'Concession boundary west gate',
      meta: '09:07 · CAM-01 · sunny · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Plantation block B4 — new growth',
      meta: '09:33 · CAM-03 · 62% hum · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Riparian buffer — north-east zone',
      meta: '10:01 · CAM-04 · overcast · Galamsey: High',
    },
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Aerial overview of Birim concession',
      meta: '10:24 · DRONE-03 · OK · Galamsey: Low',
    },
  ],
  Koforidua: [
    {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      caption: 'Koforidua eastern hills perimeter check',
      meta: '07:55 · CAM-11 · misty · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Obuoabo ridge high-altitude camera',
      meta: '08:22 · CAM-14 · clear · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
      caption: 'Access road — main gate security',
      meta: '08:49 · CAM-08 · clear · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      caption: 'Forest edge — habitat monitoring',
      meta: '09:18 · CAM-12 · 71% hum · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Interior coupe C2 — regrowth survey',
      meta: '09:46 · CAM-16 · dappled sun · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=1200&q=80',
      caption: 'Water catchment reservoir west',
      meta: '10:12 · CAM-13 · wind 8 kts · Galamsey: None',
    },
  ],
  Tinga: [
    {
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      caption: 'Tinga northern savanna watchtower',
      meta: '08:02 · CAM-21 · hazy · Galamsey: High',
    },
    {
      url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
      caption: 'Wildlife corridor — infrared trigger',
      meta: '08:31 · CAM-24 · IR mode · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Acacia stand — thermal survey',
      meta: '08:57 · CAM-22 · clear · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=1200&q=80',
      caption: 'Plateau overlook — southern boundary',
      meta: '09:25 · CAM-27 · clear · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sunrise perimeter sweep Tinga east',
      meta: '09:51 · CAM-23 · OK · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Gallery forest Tinga western edge',
      meta: '10:18 · CAM-25 · 58% hum · Galamsey: Moderate',
    },
  ],
  Sefwi: [
    {
      url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sefwi canopy research plot A',
      meta: '07:48 · CAM-31 · light rain · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
      caption: 'Old-growth block — green heart',
      meta: '08:17 · CAM-34 · overcast · Galamsey: None',
    },
    {
      url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sefwi river confluence gauge',
      meta: '08:43 · CAM-32 · Galamsey: High',
    },
    {
      url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=1200&q=80',
      caption: 'Valley plantation section E',
      meta: '09:11 · CAM-36 · 78% hum · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1444084316824-dc26d6657664?auto=format&fit=crop&w=1200&q=80',
      caption: 'Canopy walkway camera 2',
      meta: '09:39 · CAM-33 · overcast · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?auto=format&fit=crop&w=1200&q=80',
      caption: 'Reforestation nursery Sefwi south',
      meta: '10:05 · CAM-37 · OK · Galamsey: None',
    },
  ],
  Tarkwa: [
    {
      url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80',
      caption: 'Tarkwa western ridge at first light',
      meta: '08:06 · CAM-41 · sun break · Galamsey: High',
    },
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      caption: 'Rehabilitation zone progress shot',
      meta: '08:34 · CAM-44 · clear · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&w=1200&q=80',
      caption: 'Stockpile overlook security',
      meta: '08:59 · CAM-42 · clear · Galamsey: High',
    },
    {
      url: 'https://images.unsplash.com/photo-1444930694458-01babe916a95?auto=format&fit=crop&w=1200&q=80',
      caption: 'Topsoil storage windrows',
      meta: '09:27 · CAM-47 · no dust · Galamsey: Low',
    },
    {
      url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80',
      caption: 'Tarkwa buffer planting east 4',
      meta: '09:55 · CAM-45 · 65% hum · Galamsey: Moderate',
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      caption: 'Access haul road dust check',
      meta: '10:21 · CAM-43 · watered · Galamsey: None',
    },
  ],
};

function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="
        inline-flex
        items-center
        justify-center
        relative
        w-1.5
        h-1.5
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute
          inset-0
          rounded-full
          bg-red-500
          opacity-50
          animate-ping
        "
      />
      <span
        aria-hidden="true"
        className="
          relative
          w-1.5
          h-1.5
          rounded-full
          bg-red-600
        "
      />
    </span>
  );
}

function ArchiveDot() {
  return (
    <span
      aria-hidden="true"
      className="
        inline-block
        w-1.5
        h-1.5
        rounded-sm
        bg-[#0b3d91]
      "
    />
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 22s-7-7.58-7-12a7 7 0 0 1 14 0c0 4.42-7 12-7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function ghanaFormatShort(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return iso;
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  try {
    return new Intl.DateTimeFormat('en-GH', {
      timeZone: 'Africa/Accra',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dt);
  } catch {
    return iso;
  }
}

const CAROUSEL_INTERVAL_MS = 220;

interface ArchiveFrame {
  dateIso: string;
  image: FeedImage;
  cameraIdx: number;
}

export interface LocationFeedProps {
  locationIdx: number;
  cameraIdx: number;
  archiveDateIsos?: string[];
}

export default function LocationFeed({
  locationIdx,
  cameraIdx,
  archiveDateIsos = [],
}: LocationFeedProps) {
  const location = LOCATIONS[locationIdx] ?? LOCATIONS[0];
  const images = FEED[location];
  const selectedFeed = Math.min(
    Math.max(0, cameraIdx),
    images.length - 1,
  );
  const isArchive = archiveDateIsos.length > 0;

  const frames: ArchiveFrame[] = useMemo<ArchiveFrame[]>(() => {
    if (!isArchive) return [];
    const sortedDates = [...archiveDateIsos].sort();
    const camCount = images.length;
    const out: ArchiveFrame[] = [];
    for (const dateIso of sortedDates) {
      const seed = hashStr(dateIso + ':' + location);
      for (let offset = 0; offset < camCount; offset++) {
        const camIdx = (seed + offset) % camCount;
        out.push({
          dateIso,
          image: images[camIdx],
          cameraIdx: camIdx,
        });
      }
    }
    if (out.length === 0) return out;
    const firstIdx = out.findIndex(
      (f) => f.cameraIdx === selectedFeed,
    );
    if (firstIdx > 0) {
      const start = out.slice(firstIdx);
      const tail = out.slice(0, firstIdx);
      return [...start, ...tail];
    }
    return out;
  }, [archiveDateIsos, images, isArchive, location, selectedFeed]);

  const [frameIdx, setFrameIdx] = useState(0);
  const runningRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (frames.length <= 1 || !isPlaying) {
      if (runningRef.current !== null) {
        window.clearInterval(runningRef.current);
        runningRef.current = null;
      }
      return;
    }
    if (runningRef.current !== null) return;
    runningRef.current = window.setInterval(() => {
      setFrameIdx((i) => (i + 1) % frames.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => {
      if (runningRef.current !== null) {
        window.clearInterval(runningRef.current);
        runningRef.current = null;
      }
    };
  }, [frames, isPlaying]);

  const togglePlay = () => setIsPlaying((p) => !p);

  const sortedDates = useMemo(
    () => [...archiveDateIsos].sort(),
    [archiveDateIsos],
  );

  const liveImage = images[selectedFeed];
  const archiveFrame = frames[frameIdx];

  const currentImage: FeedImage = isArchive
    ? archiveFrame?.image ?? liveImage
    : liveImage;
  const currentCameraIdx = isArchive
    ? archiveFrame?.cameraIdx ?? selectedFeed
    : selectedFeed;

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
      <div className="w-full h-full max-w-6xl mx-auto flex flex-col gap-2.5 sm:gap-3 min-h-0">
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
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
              {isArchive ? 'Archive Playback' : 'Live Feed'}
            </p>
            <div
              className="
                flex
                items-center
                gap-1.5
                px-2
                py-0.5
                rounded
                border
                border-[#0b3d91]/30
                bg-[#0b3d91]/[0.06]
                text-[#092f70]
                text-[11px]
                font-semibold
                font-mono
              "
            >
              <PinIcon />
              {location} Station
            </div>
            {isArchive ? (
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  px-2
                  py-0.5
                  rounded
                  border
                  border-[#0b3d91]/30
                  bg-white
                  text-[#0b3d91]
                  text-[11px]
                  font-semibold
                  font-mono
                "
              >
                {sortedDates.length} day{sortedDates.length === 1 ? '' : 's'}
              </div>
            ) : null}
          </div>

          <div
            className={`
              flex
              items-center
              gap-1.5
              px-2
              py-0.5
              rounded
              text-[10px]
              sm:text-[11px]
              font-medium
              ${
                isArchive
                  ? 'bg-[#0b3d91]/10 text-[#0b3d91] border border-[#0b3d91]/30'
                  : 'bg-[#0b3d91] text-white'
              }
            `}
          >
            {isArchive ? <ArchiveDot /> : <LiveDot />}
            {isArchive ? 'ARCHIVE' : 'LIVE'}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-[#0b3d91]/40 via-[#0b3d91]/10 to-transparent shrink-0" />

        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="w-full h-full flex flex-col gap-3">
              <div
                className="
                  group
                  relative
                  w-full
                  flex-1
                  min-h-[280px]
                  sm:min-h-[360px]
                  aspect-square
                  sm:aspect-[16/10]
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#0f172a]/25
                  bg-[#0f172a]
                  shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5),0_2px_6px_rgba(15,23,42,0.12)]
                  power-on
                "
              >
                <Image
                  key={isArchive ? `arc-${frameIdx}` : `live-${location}-${selectedFeed}`}
                  src={currentImage.url}
                  alt={currentImage.caption}
                  fill
                  sizes="100vw"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-opacity
                    duration-[160ms]
                  "
                  priority
                />
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0f172a]/82
                    via-[#0f172a]/18
                    to-transparent
                  "
                />
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
                    rounded-[inherit]
                  "
                />
                <div
                  className="
                    absolute
                    top-2.5
                    sm:top-3
                    left-2.5
                    sm:left-3
                    flex
                    items-center
                    gap-1.5
                    px-2
                    py-1
                    rounded
                    bg-[#0f172a]/75
                    text-white
                    text-[11px]
                    sm:text-[12px]
                    font-mono
                    font-semibold
                    backdrop-blur-[2px]
                  "
                >
                  {isArchive ? (
                    <>
                      <ArchiveDot />
                      {location.slice(0, 3).toUpperCase()}-
                      {(currentCameraIdx + 1).toString().padStart(2, '0')}
                      {'  '}·  {archiveFrame ? ghanaFormatShort(archiveFrame.dateIso) : ''}
                    </>
                  ) : (
                    <>
                      <LiveDot />
                      {location.slice(0, 3).toUpperCase()}-
                      {(currentCameraIdx + 1).toString().padStart(2, '0')}
                    </>
                  )}
                </div>
                {(isArchive && frames.length > 1) || !isArchive ? (
                  <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 flex items-center gap-1.5">
                    {isArchive && !isPlaying ? (
                      <div
                        className="
                          px-2
                          py-1
                          rounded
                          bg-amber-500/95
                          text-white
                          text-[11px]
                          font-mono
                          font-bold
                          backdrop-blur-[2px]
                          flex
                          items-center
                          gap-1
                        "
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                        </svg>
                        PAUSED
                      </div>
                    ) : null}
                    {isArchive && frames.length > 1 ? (
                      <div
                        className="
                          px-2
                          py-1
                          rounded
                          bg-[#0b3d91]/90
                          text-white
                          text-[11px]
                          font-mono
                          font-semibold
                          backdrop-blur-[2px]
                        "
                      >
                        {frameIdx + 1}/{frames.length}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause playback' : 'Play'}
                      aria-pressed={!isPlaying}
                      className="
                        group/play
                        inline-flex
                        items-center
                        justify-center
                        w-9
                        h-9
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
                        focus-visible:ring-offset-[#0f172a]
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
                  </div>
                ) : null}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    p-3
                    sm:p-4
                    text-white
                  "
                >
                  <p
                    className="
                      text-[14px]
                      sm:text-[16px]
                      md:text-[17px]
                      font-semibold
                      leading-snug
                      drop-shadow-[0_1px_2px_rgba(15,23,42,0.8)]
                    "
                  >
                    {currentImage.caption}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-[12px] font-mono text-white/85">
                    {isArchive
                      ? `${archiveFrame ? ghanaFormatShort(archiveFrame.dateIso) : ''}  ·  ${currentImage.meta}`
                      : currentImage.meta}
                  </p>
                </div>
                {isArchive && frames.length > 1 ? (
                  <div
                    className="
                      absolute
                      inset-x-3
                      sm:inset-x-4
                      bottom-[calc(theme(spacing.3)+48px)]
                      sm:bottom-[calc(theme(spacing.4)+56px)]
                      h-[3px]
                      rounded-full
                      bg-white/15
                      overflow-hidden
                    "
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-white/80 rounded-full"
                      style={{
                        width: `${((frameIdx + 1) / frames.length) * 100}%`,
                        transition: 'width 160ms linear',
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div
                className="
                  shrink-0
                  rounded-lg
                  border
                  border-[#e2e8f0]
                  bg-white
                  p-2.5
                  sm:p-3
                  flex
                  items-start
                  gap-2.5
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    shrink-0
                    w-8
                    h-8
                    rounded-lg
                    bg-[#0b3d91]/10
                    border
                    border-[#0b3d91]/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  {isArchive ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-[16px] h-[16px] text-[#0b3d91]"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16 10 5-2.5v9L16 14" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-[16px] h-[16px] text-[#0b3d91]"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0f172a] text-[12px] sm:text-[13px]">
                    {isArchive ? (
                      <>
                        Archive Playlist · {location.slice(0, 3).toUpperCase()}-
                        {String(cameraIdx + 1).padStart(2, '0')}
                      </>
                    ) : (
                      <>
                        Camera Feed · {location.slice(0, 3).toUpperCase()}-
                        {String(selectedFeed + 1).padStart(2, '0')}
                      </>
                    )}
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-[12px] text-[#475569] leading-relaxed">
                    {isArchive
                      ? sortedDates.length > 0
                        ? `Fast carousel through archive captures ${ghanaFormatShort(sortedDates[0])}${
                            sortedDates.length > 1
                              ? ' → ' + ghanaFormatShort(sortedDates[sortedDates.length - 1])
                              : ''
                          } — multiple frames per day emulate video playback.`
                        : 'Archive playlist is loading.'
                      : 'Live view from the selected camera. Use the sidebar to change station or switch cameras. Click Live Feed to return from archive mode.'}
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
