'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { LocationType } from './DisplayArea';

const GHANA_TZ = 'Africa/Accra';

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
      meta: '09:33 · CAM-07 · 62% hum · Galamsey: None',
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

const LOCATION_COVER: Record<LocationType, string> = {
  Birim: FEED.Birim[0].url,
  Koforidua: FEED.Koforidua[0].url,
  Tinga: FEED.Tinga[0].url,
  Sefwi: FEED.Sefwi[0].url,
  Tarkwa: FEED.Tarkwa[0].url,
};

const LOCATION_BLURB: Record<LocationType, string> = {
  Birim: '6 feeds · Forest canopy & riparian buffers',
  Koforidua: '6 feeds · Eastern hills & high altitude',
  Tinga: '6 feeds · Northern savanna & wildlife',
  Sefwi: '6 feeds · Old-growth & reforestation',
  Tarkwa: '6 feeds · Rehabilitation & haul roads',
};

export interface DateDisplayProps {
  pickedDateIso: string;
  onPickDateChange: (iso: string) => void;
  playOpen: boolean;
  viewerOpen: boolean;
  viewerLocationIdx: number;
  viewerFeedIdx: number | null;
  onClosePlay: () => void;
  onConfirmPlay: () => void;
  onCloseViewer: () => void;
  onViewerSelectLocation: (idx: number) => void;
  onViewerBack: () => void;
  onViewerSelectFeed: (idx: number) => void;
  hideMainPanel?: boolean;
}

function ghanaDatePartsFromIso(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return { year, month, day };
}

function formatGhanaDate(iso: string): string {
  const { year, month, day } = ghanaDatePartsFromIso(iso);
  const d = new Date(Date.UTC(year, month - 1, day, 12));
  return d.toLocaleDateString('en-GH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function formatGhanaDateShort(iso: string): string {
  return iso;
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

export default function DateDisplay(props: DateDisplayProps) {
  const {
    pickedDateIso,
    playOpen,
    viewerOpen,
    viewerLocationIdx,
    viewerFeedIdx,
    onClosePlay,
    onConfirmPlay,
    onCloseViewer,
    onViewerSelectLocation,
    onViewerBack,
    onViewerSelectFeed,
    hideMainPanel = false,
  } = props;

  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const { year: pYear, month: pMonth, day: pDay } = ghanaDatePartsFromIso(pickedDateIso);
  const displayDate = new Date(Date.UTC(pYear, pMonth - 1, pDay, 12));
  const weekday = displayDate.toLocaleDateString('en-GH', { timeZone: 'UTC', weekday: 'long' });
  const day = displayDate.toLocaleDateString('en-GH', { timeZone: 'UTC', day: '2-digit' });
  const month = displayDate.toLocaleDateString('en-GH', { timeZone: 'UTC', month: 'long' });
  const year = displayDate.toLocaleDateString('en-GH', { timeZone: 'UTC', year: 'numeric' });

  const offsetLabel =
    Intl.DateTimeFormat('en-GH', { timeZone: GHANA_TZ, timeZoneName: 'short' })
      .formatToParts(now)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';

  const viewerLoc = LOCATIONS[viewerLocationIdx] ?? LOCATIONS[0];
  const viewerImages = FEED[viewerLoc] ?? [];

  return (
    <>
      {!hideMainPanel && (
        <div
          className="
            h-full
            w-full
            min-h-0
            flex
            items-stretch
            justify-center
            px-3
            sm:px-5
            md:px-8
            py-3.5
            sm:py-4.5
            md:py-5
            overflow-hidden
          "
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-3 sm:gap-4 min-h-0">
        <div className="flex items-center justify-between gap-4">
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
              Date
            </p>
          </div>
          <div
            className="
              flex
              items-center
              gap-1.5
              px-2
              py-0.5
              rounded
              bg-emerald-50
              border
              border-emerald-200
              text-emerald-700
              text-[10px]
              sm:text-[11px]
              font-medium
            "
          >
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"
            />
            Synchronised
          </div>
        </div>

        <div
          className="
            w-full
            flex-1
            min-h-0
            rounded-xl
            border
            border-[#cbd5e1]
            bg-white
            shadow-[0_1px_2px_rgba(15,23,42,0.05)]
            p-4
            sm:p-6
            md:p-7
            overflow-hidden
          "
        >
          <div className="h-full min-h-0 flex flex-col gap-3 sm:gap-4">
            <div className="space-y-1">
              <p
                className="
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#64748b]
                "
              >
                {weekday}
              </p>
              <p
                className="
                  font-sans
                  font-bold
                  tracking-tight
                  text-[#0f172a]
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  leading-[1.1]
                "
              >
                {day} {month} {year}
              </p>
              <p
                className="
                  text-[11px]
                  sm:text-xs
                  text-[#0b3d91]
                  font-semibold
                  flex
                  items-center
                  gap-1.5
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 3v4M16 3v4" />
                </svg>
                Archive date · use the calendar in the sidebar to change
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-[#e2e8f0]">
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#64748b]
                    mb-0.5
                  "
                >
                  Timezone
                </p>
                <p
                  className="
                    text-[12px]
                    sm:text-sm
                    font-semibold
                    text-[#0f172a]
                    font-mono
                    truncate
                  "
                >
                  {GHANA_TZ}
                </p>
              </div>
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#64748b]
                    mb-0.5
                  "
                >
                  Offset
                </p>
                <p
                  className="
                    text-[12px]
                    sm:text-sm
                    font-semibold
                    text-[#0f172a]
                    font-mono
                  "
                >
                  {offsetLabel}
                </p>
              </div>
              <div>
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#64748b]
                    mb-0.5
                  "
                >
                  Selected
                </p>
                <p
                  className="
                    text-[12px]
                    sm:text-sm
                    font-semibold
                    text-[#0f172a]
                    font-mono
                  "
                >
                  {formatGhanaDateShort(pickedDateIso)}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-[#e2e8f0]" />
            <div
              className="
                rounded-lg
                border
                border-[#0b3d91]/15
                bg-gradient-to-r
                from-[#0b3d91]/[0.04]
                via-[#0b3d91]/[0.02]
                to-transparent
                p-3
                sm:p-3.5
              "
            >
              <div className="flex items-start gap-2.5">
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-[#0b3d91]"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0f172a] text-[12px] sm:text-[13px]">
                    Archived playback · {formatGhanaDate(pickedDateIso)}
                  </p>
                  <p className="mt-0.5 text-[11px] sm:text-[12px] text-[#475569] leading-relaxed">
                    Tap Play on the calendar above to open the station selector and
                    review recorded station feeds for {formatGhanaDateShort(pickedDateIso)}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}

      {playOpen ? (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            p-3
            sm:p-5
          "
          role="dialog"
          aria-modal="true"
          aria-label="Play day feed"
        >
          <div
            className="absolute inset-0 bg-[#0f172a]/65 backdrop-blur-[3px]"
            onClick={onClosePlay}
            aria-hidden="true"
          />
          <div
            className="
              relative
              w-full
              max-w-sm
              rounded-2xl
              border
              border-[#cbd5e1]
              bg-white
              shadow-[0_30px_80px_-20px_rgba(15,23,42,0.55),0_10px_24px_-12px_rgba(11,61,145,0.35)]
              overflow-hidden
              power-on
            "
          >
            <div
              className="
                px-5
                pt-6
                pb-3
                text-center
                bg-gradient-to-b
                from-[#0b3d91]
                to-[#092f70]
                text-white
              "
            >
              <div
                className="
                  mx-auto
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  mb-3
                "
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-white translate-x-[1px]"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 mb-1">
                Archived footage
              </p>
              <p className="font-bold text-lg sm:text-xl leading-tight">
                {formatGhanaDate(pickedDateIso)}
              </p>
            </div>

            <div className="px-5 py-4 sm:px-6">
              <p className="text-[12px] sm:text-[13px] text-[#475569] leading-relaxed text-center">
                Tap <span className="font-semibold text-[#0b3d91]">Play</span> to open the
                location selector and review station feeds captured on this day.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                gap-2
                px-5
                pb-5
                sm:px-6
              "
            >
              <button
                type="button"
                onClick={onClosePlay}
                className="
                  flex-1
                  px-3
                  py-2
                  rounded-lg
                  text-[12px]
                  sm:text-[13px]
                  font-semibold
                  border
                  border-[#cbd5e1]
                  bg-white
                  text-[#0f172a]
                  hover:bg-[#f1f5f9]
                  active:translate-y-[1px]
                  transition-all
                  duration-[110ms]
                  ease-out
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmPlay}
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  px-3
                  py-2
                  rounded-lg
                  text-[12px]
                  sm:text-[13px]
                  font-semibold
                  border
                  border-[#0b3d91]
                  bg-gradient-to-b
                  from-[#0b3d91]
                  to-[#092f70]
                  text-white
                  shadow-[0_6px_16px_-8px_rgba(11,61,145,0.65),inset_0_1px_0_rgba(255,255,255,0.15)]
                  hover:brightness-110
                  active:translate-y-[1px]
                  transition-all
                  duration-[110ms]
                  ease-out
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 translate-x-[0.5px]"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {viewerOpen ? (
        <div
          className="
            fixed
            inset-0
            z-[70]
            flex
            items-center
            justify-center
            p-2
            sm:p-4
            md:p-6
          "
          role="dialog"
          aria-modal="true"
          aria-label="Day feed viewer"
        >
          <div
            className="absolute inset-0 bg-[#0f172a]/75 backdrop-blur-[4px]"
            onClick={onCloseViewer}
            aria-hidden="true"
          />
          <div
            className="
              relative
              w-full
              max-w-5xl
              max-h-full
              h-[min(86vh,900px)]
              rounded-2xl
              border
              border-[#cbd5e1]
              bg-[#f4f6fa]
              shadow-[0_40px_90px_-24px_rgba(15,23,42,0.6),0_14px_36px_-18px_rgba(11,61,145,0.35)]
              overflow-hidden
              flex
              flex-col
              power-on
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-2
                px-3.5
                sm:px-5
                py-2.5
                sm:py-3
                border-b
                border-[#c6cddb]
                bg-gradient-to-b
                from-[#0b3d91]
                to-[#092f70]
                text-white
                shrink-0
              "
            >
              <div className="min-w-0 flex items-center gap-2.5">
                <div
                  aria-hidden="true"
                  className="
                    shrink-0
                    w-8
                    h-8
                    rounded-lg
                    bg-white/10
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[16px] h-[16px] text-white"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M7 8h10M7 12h6M12 18l-3-3h6l-3 3Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 leading-tight">
                    Day viewer · {formatGhanaDateShort(pickedDateIso)}
                  </p>
                  <p className="font-semibold text-[13px] sm:text-[14px] leading-tight truncate">
                    {formatGhanaDate(pickedDateIso)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseViewer}
                aria-label="Close day feed viewer"
                className="
                  shrink-0
                  w-8
                  h-8
                  rounded-lg
                  bg-white/10
                  hover:bg-white/20
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {viewerFeedIdx === null && viewerLoc ? (
                <div
                  className="
                    w-full
                    h-full
                    flex-1
                    min-h-0
                    flex
                    flex-col
                    px-3.5
                    sm:px-5
                    md:px-6
                    py-3.5
                    sm:py-4
                    overflow-hidden
                  "
                >
                  <div className="w-full h-full max-w-5xl mx-auto flex flex-col gap-3 min-h-0">
                    <div className="flex items-center justify-between gap-2 shrink-0">
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
                          Select station
                        </p>
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
                          className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                        />
                        ARCHIVE · {formatGhanaDateShort(pickedDateIso)}
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-[#0b3d91]/40 via-[#0b3d91]/10 to-transparent shrink-0" />

                    <div
                      className="
                        flex-1
                        min-h-0
                        overflow-y-auto
                        pr-1
                      "
                    >
                      <ul
                        className="
                          grid
                          grid-cols-1
                          sm:grid-cols-2
                          lg:grid-cols-3
                          gap-2.5
                          sm:gap-3
                          pb-1
                        "
                      >
                        {LOCATIONS.map((loc, idx) => (
                          <li key={loc}>
                            <button
                              type="button"
                              onClick={() => onViewerSelectLocation(idx)}
                              aria-label={`Open ${loc} station feed for ${formatGhanaDateShort(pickedDateIso)}`}
                              className="
                                group
                                relative
                                w-full
                                text-left
                                overflow-hidden
                                rounded-xl
                                border
                                border-[#cbd5e1]
                                bg-white
                                shadow-[0_2px_8px_-4px_rgba(15,23,42,0.18),0_1px_2px_rgba(15,23,42,0.05)]
                                hover:shadow-[0_10px_24px_-10px_rgba(11,61,145,0.3),0_2px_6px_-2px_rgba(15,23,42,0.12)]
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-[#0b3d91]
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-white
                                transition-all
                                duration-[160ms]
                                ease-out
                                hover:-translate-y-[1px]
                                power-on
                              "
                              style={{ animationDelay: `${idx * 50}ms` }}
                            >
                              <div className="relative w-full aspect-[5/3] overflow-hidden">
                                <Image
                                  src={LOCATION_COVER[loc]}
                                  alt={`${loc} station cover`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="
                                    w-full
                                    h-full
                                    object-cover
                                    transition-transform
                                    duration-300
                                    ease-out
                                    group-hover:scale-[1.04]
                                  "
                                />
                                <div
                                  aria-hidden="true"
                                  className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0f172a]/85
                                    via-[#0f172a]/25
                                    to-[#0f172a]/10
                                  "
                                />
                                <div
                                  className="
                                    absolute
                                    top-2
                                    left-2
                                    flex
                                    items-center
                                    gap-1.5
                                    px-2
                                    py-0.5
                                    rounded
                                    bg-white/90
                                    text-[#092f70]
                                    text-[10px]
                                    font-semibold
                                    font-mono
                                    backdrop-blur-[2px]
                                    shadow-[0_1px_2px_rgba(15,23,42,0.15)]
                                  "
                                >
                                  <span
                                    aria-hidden="true"
                                    className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                                  />
                                  ARCHIVE · {loc.toUpperCase().slice(0, 3)}
                                </div>
                                <div
                                  className="
                                    absolute
                                    right-2
                                    bottom-2
                                    flex
                                    items-center
                                    gap-1.5
                                    px-2
                                    py-0.5
                                    rounded
                                    bg-[#0b3d91]
                                    text-white
                                    text-[10px]
                                    font-semibold
                                    shadow-[0_2px_6px_-2px_rgba(11,61,145,0.55)]
                                    opacity-95
                                    group-hover:opacity-100
                                    transition-opacity
                                  "
                                >
                                  Watch feed
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3 h-3 translate-x-[1px] group-hover:translate-x-[2px] transition-transform"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                              <div className="p-2.5 sm:p-3 space-y-0.5">
                                <div className="flex items-center gap-1.5 text-[#0b3d91]">
                                  <PinIcon />
                                  <p className="font-bold text-[#0f172a] text-[13px] sm:text-[14px] leading-tight truncate">
                                    {loc} Station
                                  </p>
                                </div>
                                <p className="text-[11px] sm:text-[12px] text-[#475569] leading-relaxed truncate">
                                  {LOCATION_BLURB[loc]}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="
                        shrink-0
                        pt-2
                        border-t
                        border-[#e2e8f0]
                        text-[10px]
                        sm:text-[11px]
                        text-[#475569]
                        font-mono
                      "
                    >
                      Select a station to view its archive feed for {formatGhanaDateShort(pickedDateIso)}.
                    </div>
                  </div>
                </div>
              ) : (
                  <div
                    className="
                      w-full
                      h-full
                      flex-1
                      min-h-0
                      flex
                      flex-col
                      px-3.5
                      sm:px-5
                      md:px-6
                      py-3
                      sm:py-3.5
                      overflow-hidden
                    "
                  >
                    <div className="w-full h-full max-w-6xl mx-auto flex flex-col gap-2.5 sm:gap-3 min-h-0">
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={onViewerBack}
                          aria-label={viewerFeedIdx !== null && viewerFeedIdx !== -1 ? "Back to station feeds" : "Back to station list"}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            h-8
                            sm:h-9
                            px-2.5
                            sm:px-3
                            rounded-lg
                            border
                            border-[#cbd5e1]
                            bg-white
                            text-[#0f172a]
                            text-[11px]
                            sm:text-[12px]
                            font-semibold
                            shadow-[0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.85)]
                            hover:border-[#94a3b8]
                            hover:bg-[#f8fafc]
                            active:translate-y-[1px]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#0b3d91]
                            focus-visible:ring-offset-1
                            focus-visible:ring-offset-white
                            transition-all
                            duration-[110ms]
                            ease-out
                          "
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3.5 h-3.5 -translate-x-[1px]"
                          >
                            <path d="M19 12H5" />
                            <path d="m12 19-7-7 7-7" />
                          </svg>
                          Back
                        </button>

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
                            Day feed
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
                            {viewerLoc} Station · {formatGhanaDateShort(pickedDateIso)}
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
                            className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                          />
                          ARCHIVE
                        </div>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-[#0b3d91]/40 via-[#0b3d91]/10 to-transparent shrink-0" />

                      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                        {viewerFeedIdx !== null && viewerFeedIdx !== -1 ? (
                          <div className="w-full h-full flex flex-col gap-3">
                            <div
                              className="
                                group
                                relative
                                w-full
                                flex-1
                                min-h-[280px]
                                sm:min-h-[360px]
                                aspect-[16/10]
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
                                src={viewerImages[viewerFeedIdx]?.url ?? viewerImages[0]?.url ?? ''}
                                alt={viewerImages[viewerFeedIdx]?.caption ?? ''}
                                fill
                                sizes="100vw"
                                className="
                                  w-full
                                  h-full
                                  object-cover
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
                                <span
                                  aria-hidden="true"
                                  className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                                />
                                {viewerLoc.slice(0, 3).toUpperCase()}-
                                {((viewerFeedIdx ?? 0) + 1).toString().padStart(2, '0')} · {formatGhanaDateShort(pickedDateIso)}
                              </div>
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
                                  {viewerImages[viewerFeedIdx]?.caption}
                                </p>
                                <p className="mt-1 text-[11px] sm:text-[12px] font-mono text-white/85">
                                  {viewerImages[viewerFeedIdx]?.meta}
                                </p>
                              </div>
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
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-[#0f172a] text-[12px] sm:text-[13px]">
                                  Archive Feed · {viewerLoc.slice(0, 3).toUpperCase()}-
                                  {((viewerFeedIdx ?? 0) + 1).toString().padStart(2, '0')}
                                </p>
                                <p className="mt-0.5 text-[11px] sm:text-[12px] text-[#475569] leading-relaxed">
                                  Recorded view from {formatGhanaDate(pickedDateIso)}. Use the back button to
                                  return to the feed grid and select another camera.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="
                              grid
                              grid-cols-1
                              sm:grid-cols-2
                              lg:grid-cols-3
                              gap-2.5
                              sm:gap-3
                              pb-1
                            "
                          >
                            {viewerImages.map((img, idx) => (
                              <button
                                key={`${viewerLoc}-${idx}`}
                                type="button"
                                onClick={() => onViewerSelectFeed(idx)}
                                aria-label={`Open ${viewerLoc} camera ${(idx + 1).toString().padStart(2, '0')} archive feed`}
                                className="
                                  group
                                  relative
                                  w-full
                                  text-left
                                  aspect-[4/3]
                                  overflow-hidden
                                  rounded-lg
                                  border
                                  border-[#0f172a]/20
                                  bg-[#0f172a]
                                  shadow-[0_6px_18px_-12px_rgba(15,23,42,0.45),0_1px_2px_rgba(15,23,42,0.1)]
                                  hover:shadow-[0_12px_28px_-12px_rgba(11,61,145,0.4),0_2px_6px_rgba(15,23,42,0.12)]
                                  hover:-translate-y-[1px]
                                  focus-visible:outline-none
                                  focus-visible:ring-2
                                  focus-visible:ring-[#0b3d91]
                                  focus-visible:ring-offset-2
                                  focus-visible:ring-offset-white
                                  transition-all
                                  duration-[160ms]
                                  ease-out
                                  power-on
                                "
                                style={{ animationDelay: `${idx * 45}ms` }}
                              >
                                <Image
                                  src={img.url}
                                  alt={img.caption}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="
                                    w-full
                                    h-full
                                    object-cover
                                    transition-all
                                    duration-300
                                    ease-out
                                    group-hover:scale-[1.04]
                                  "
                                />
                                <div
                                  aria-hidden="true"
                                  className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0f172a]/80
                                    via-[#0f172a]/10
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
                                    top-2
                                    left-2
                                    flex
                                    items-center
                                    gap-1.5
                                    px-1.5
                                    py-0.5
                                    rounded
                                    bg-[#0f172a]/70
                                    text-white
                                    text-[10px]
                                    font-mono
                                    font-semibold
                                    backdrop-blur-[2px]
                                  "
                                >
                                  <span
                                    aria-hidden="true"
                                    className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"
                                  />
                                  {viewerLoc.slice(0, 3).toUpperCase()}-
                                  {(idx + 1).toString().padStart(2, '0')}
                                </div>
                                <div
                                  className="
                                    absolute
                                    right-2
                                    bottom-2
                                    flex
                                    items-center
                                    gap-1
                                    px-2
                                    py-0.5
                                    rounded
                                    bg-[#0b3d91]
                                    text-white
                                    text-[10px]
                                    font-semibold
                                    shadow-[0_2px_6px_-2px_rgba(11,61,145,0.55)]
                                    opacity-0
                                    group-hover:opacity-100
                                    group-focus-visible:opacity-100
                                    transition-opacity
                                  "
                                >
                                  Open
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3 h-3 translate-x-[1px] group-hover:translate-x-[2px] transition-transform"
                                  >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                  </svg>
                                </div>
                                <div
                                  className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    p-2
                                    sm:p-2.5
                                    text-white
                                    pointer-events-none
                                  "
                                >
                                  <p
                                    className="
                                      text-[12px]
                                      sm:text-[13px]
                                      font-semibold
                                      leading-snug
                                      drop-shadow-[0_1px_1px_rgba(15,23,42,0.7)]
                                    "
                                  >
                                    {img.caption}
                                  </p>
                                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-mono text-white/80">
                                    {img.meta}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      ) : null}
    </>
  );
}
