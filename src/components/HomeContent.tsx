import Image from 'next/image';
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

const LOCATION_BLURB: Record<LocationType, string> = {
  Birim: 'Forest canopy & riparian buffers · 6 feeds',
  Koforidua: 'Eastern hills & high altitude · 6 feeds',
  Tinga: 'Northern savanna & wildlife · 6 feeds',
  Sefwi: 'Old-growth & reforestation · 6 feeds',
  Tarkwa: 'Rehabilitation & haul roads · 6 feeds',
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

export interface HomeContentProps {
  selectedLocationIdx: number;
  selectedCameraIdx: number;
}

export default function HomeContent({
  selectedLocationIdx,
  selectedCameraIdx,
}: HomeContentProps) {
  const loc = LOCATIONS[selectedLocationIdx] ?? LOCATIONS[0];
  const feeds = FEED[loc] ?? [];
  const cam = feeds[selectedCameraIdx] ?? feeds[0] ?? null;

  return (
    <div
      className="
        h-full
        w-full
        min-h-0
        flex
        flex-col
        px-4
        sm:px-6
        md:px-8
        py-4
        sm:py-5
        md:py-6
        overflow-y-auto
      "
    >
      <div className="max-w-5xl w-full mx-auto flex-1 min-h-0 flex flex-col gap-4 sm:gap-5">
        <div className="space-y-2">
          <p
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              sm:text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#0b3d91]
            "
          >
            <span
              aria-hidden="true"
              className="inline-block w-5 h-px bg-[#0b3d91]"
            />
            Information Console
          </p>
          <h1
            className="
              font-sans
              font-bold
              tracking-tight
              text-[#0f172a]
              text-xl
              sm:text-2xl
              md:text-3xl
              leading-[1.1]
            "
          >
            Home — System Overview
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-[#0b3d91]/40 via-[#0b3d91]/10 to-transparent" />
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-2.5
            sm:gap-3
          "
        >
          <div
            className="
              rounded-lg
              border
              border-[#cbd5e1]/80
              bg-white
              shadow-[0_1px_2px_rgba(15,23,42,0.04)]
              p-3
              sm:p-3.5
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#475569]
                mb-1
              "
            >
              Channel · 01
            </p>
            <p className="font-semibold text-[#0f172a] text-sm mb-0.5">
              Home
            </p>
            <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed">
              System overview and live feed preview.
            </p>
          </div>

          <div
            className="
              rounded-lg
              border
              border-[#cbd5e1]/80
              bg-white
              shadow-[0_1px_2px_rgba(15,23,42,0.04)]
              p-3
              sm:p-3.5
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#475569]
                mb-1
              "
            >
              Channel · 02
            </p>
            <p className="font-semibold text-[#0f172a] text-sm mb-0.5">
              Date
            </p>
            <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed">
              Pick a day in the sidebar and tap Play.
            </p>
          </div>

          <div
            className="
              rounded-lg
              border
              border-[#cbd5e1]/80
              bg-white
              shadow-[0_1px_2px_rgba(15,23,42,0.04)]
              p-3
              sm:p-3.5
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#475569]
                mb-1
              "
            >
              Channel · 03
            </p>
            <p className="font-semibold text-[#0f172a] text-sm mb-0.5">
              Feed
            </p>
            <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed">
              Live feed from the selected station.
            </p>
          </div>
        </div>

        <div
          className="
            rounded-xl
            border
            border-[#0b3d91]/15
            bg-gradient-to-br
            from-white
            via-[#f8fbff]
            to-[#eef2f7]
            shadow-[0_2px_8px_-4px_rgba(15,23,42,0.18)]
            overflow-hidden
          "
        >
          <div className="flex flex-col lg:flex-row gap-0 h-full">
            {cam && (
              <div className="relative flex-1 min-h-[230px] lg:min-h-0 lg:aspect-[16/10] bg-[#0f172a]">
                <Image
                  src={cam.url}
                  alt={`${loc} station live feed`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority={false}
                />
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0f172a]/85
                    via-[#0f172a]/10
                    to-transparent
                  "
                />
                <div
                  className="
                    absolute
                    top-2.5
                    left-2.5
                    flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-md
                    bg-red-600
                    text-white
                    text-[10px]
                    font-semibold
                    font-mono
                    tracking-wide
                    shadow-[0_1px_2px_rgba(15,23,42,0.35)]
                  "
                >
                  <LiveDot />
                  LIVE · {loc.toUpperCase().slice(0, 3)} · CAM-{String(selectedCameraIdx + 1).padStart(2, '0')}
                </div>
                <div
                  className="
                    absolute
                    bottom-3
                    left-3
                    right-3
                    text-white
                  "
                >
                  <p className="text-[11px] sm:text-xs text-white/80 font-mono">
                    {cam.meta}
                  </p>
                  <p className="text-[13px] sm:text-sm font-semibold leading-snug mt-0.5">
                    {cam.caption}
                  </p>
                </div>
              </div>
            )}
            <div className="w-full lg:w-[280px] shrink-0 p-3.5 sm:p-4 flex flex-col gap-2.5 bg-white border-t lg:border-t-0 lg:border-l border-[#dbe1ec]/80">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#475569]
                    "
                  >
                    Live Feed
                  </p>
                  <p className="font-bold text-[#0f172a] text-[15px] sm:text-base leading-tight mt-0.5">
                    {loc} Station
                  </p>
                </div>
                <span
                  className="
                    shrink-0
                    inline-flex
                    items-center
                    gap-1
                    px-2
                    py-0.5
                    rounded
                    bg-emerald-50
                    border
                    border-emerald-200
                    text-emerald-700
                    text-[10px]
                    font-mono
                  "
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"
                  />
                  Online
                </span>
              </div>
              <p className="text-[12px] text-[#475569] leading-relaxed">
                {LOCATION_BLURB[loc]}
              </p>
              <div className="w-full h-px bg-[#e2e8f0]" />
              <dl className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <dt className="text-[#64748b] uppercase tracking-wider font-semibold text-[9px]">
                    Station
                  </dt>
                  <dd className="font-mono text-[#0f172a] mt-0.5">
                    STN-{String(selectedLocationIdx + 1).padStart(2, '0')}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#64748b] uppercase tracking-wider font-semibold text-[9px]">
                    Camera
                  </dt>
                  <dd className="font-mono text-[#0f172a] mt-0.5">
                    CAM-{String(selectedCameraIdx + 1).padStart(2, '0')}
                  </dd>
                </div>
              </dl>
              <p className="pt-1 mt-auto text-[11px] text-[#475569] leading-relaxed">
                Change the station or camera in the left sidebar to see a
                different live feed. Archived playback uses the Play button
                under the calendar.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            flex-1
            min-h-0
            rounded-lg
            border
            border-[#0b3d91]/20
            bg-gradient-to-r
            from-[#0b3d91]/[0.04]
            via-[#0b3d91]/[0.02]
            to-transparent
            p-3
            sm:p-4
            overflow-hidden
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-3 h-full">
            <div
              aria-hidden="true"
              className="
                shrink-0
                w-9
                h-9
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
                className="w-[18px] h-[18px] text-[#0b3d91]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v7.5L15 9.75 12 12M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                />
              </svg>
            </div>
            <div className="flex-1 min-h-0 flex flex-col gap-1">
              <p className="font-semibold text-[#0f172a] text-sm">
                Notice · Operating Normally
              </p>
              <p className="text-[12px] sm:text-[13px] text-[#475569] leading-relaxed overflow-hidden">
                Use the control panels on the left to choose a station and
                camera, or select an archive date and tap Play to review
                recorded station feeds for that day. For assistance contact
                your designated administrator.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-1.5
            pt-1.5
            border-t
            border-[#e2e8f0]
          "
        >
          <p className="text-[10px] sm:text-[11px] text-[#64748b] font-mono">
            Classification · Official Use
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#64748b] font-mono">
            Last updated · Today · System OK
          </p>
        </div>
      </div>
    </div>
  );
}
