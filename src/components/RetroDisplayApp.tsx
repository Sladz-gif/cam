'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import DisplayArea, { type ViewType, type LocationType } from '@/components/DisplayArea';
import ButtonPanel from '@/components/ButtonPanel';
import Link from 'next/link';
import { logActivity, shouldLogVisit } from '@/lib/activityLogger';

const GHANA_TZ = 'Africa/Accra';

const LOCATIONS: LocationType[] = [
  'Birim',
  'Koforidua',
  'Tinga',
  'Sefwi',
  'Tarkwa',
];

function ghanaDateParts(date: Date) {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: GHANA_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = f.formatToParts(date);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? '';
  return {
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
  };
}

function ghanaTodayIso() {
  const p = ghanaDateParts(new Date());
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

export default function RetroDisplayApp() {
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [selectedLocationIdx, setSelectedLocationIdx] = useState(0);
  const [selectedCameraIdx, setSelectedCameraIdx] = useState(0);
  const [pickedDateIsos, setPickedDateIsos] = useState<string[]>([]);
  const [feedSelectionVersion, setFeedSelectionVersion] = useState(0);

  useEffect(() => {
    if (!shouldLogVisit()) return;
    void logActivity({
      event_type: 'visit',
      location_idx: selectedLocationIdx,
      camera_idx: selectedCameraIdx,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewChange = useCallback((view: ViewType) => {
    if (view === 'feed') {
      setPickedDateIsos([]);
      setFeedSelectionVersion((v) => v + 1);
    }
    setActiveView(view);
  }, []);

  const handleLocationChange = useCallback((idx: number) => {
    setSelectedLocationIdx(idx);
    setSelectedCameraIdx(0);
    setFeedSelectionVersion((v) => v + 1);
    setActiveView('feed');
    void logActivity({
      event_type: 'location_change',
      location_idx: idx,
      camera_idx: 0,
    });
  }, []);

  const handleCameraChange = useCallback((idx: number) => {
    setSelectedCameraIdx(idx);
    setFeedSelectionVersion((v) => v + 1);
    setActiveView('feed');
    void logActivity({
      event_type: 'camera_change',
      location_idx: selectedLocationIdx,
      camera_idx: idx,
    });
  }, [selectedLocationIdx]);

  const handlePickDatesChange = useCallback((isos: string[]) => {
    const sorted = [...isos].sort();
    setPickedDateIsos(sorted);
    setFeedSelectionVersion((v) => v + 1);
    setActiveView('feed');
    if (sorted.length > 0) {
      const last = sorted[sorted.length - 1];
      void logActivity({
        event_type: 'date_pick',
        picked_date_iso: last,
        detail: { picked_dates: sorted },
      });
    }
  }, []);

  const displayProps = useMemo(
    () => ({
      selectedLocationIdx,
      selectedCameraIdx,
      pickedDateIsos,
      feedSelectionVersion,
    }),
    [
      selectedLocationIdx,
      selectedCameraIdx,
      pickedDateIsos,
      feedSelectionVersion,
    ],
  );

  const todayIso = useMemo(() => ghanaTodayIso(), []);
  const isArchiveMode = pickedDateIsos.length > 0;

  return (
    <div
      className="
        relative
        w-full
        h-screen
        min-h-0
        shadow-[0_18px_45px_-18px_rgba(15,23,42,0.35),0_6px_16px_-8px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(15,23,42,0.08)]
        bg-gradient-to-br
        from-[#f4f6fa]
        via-[#eef2f7]
        to-[#e2e7ef]
        border-l
        border-r
        border-[#c4cbd7]
        chassis-noise
        overflow-hidden
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          chassis-grain
          opacity-[0.08]
        "
        aria-hidden="true"
      />

      <div
        className="
          relative
          w-full
          h-full
          min-h-0
          flex
          flex-col
          sm:flex-row
          gap-0
        "
      >
        <aside
          aria-label="Primary navigation"
          className="
            relative
            w-full
            sm:w-[240px]
            md:w-[260px]
            lg:w-[270px]
            shrink-0
            flex
            flex-col
            gap-0
            h-full
            min-h-0
            border-b
            sm:border-b-0
            sm:border-r
            border-[#cbd2df]
            bg-gradient-to-b
            from-[#e9edf4]
            via-[#e2e7ef]
            to-[#d9dfeb]
            shadow-[inset_-1px_0_0_rgba(15,23,42,0.05)]
            overflow-hidden
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              px-3.5
              sm:px-4
              py-2.5
              sm:py-3
              border-b
              border-[#c6cddb]
              bg-gradient-to-b
              from-[#0b3d91]
              to-[#092f70]
              text-white
            "
          >
            <div className="flex items-center gap-2.5 min-w-0">
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
                  className="w-[18px] h-[18px] text-white"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 9h10M7 13h6"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[12px] sm:text-[13px] leading-tight truncate">
                  Display System
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/75 leading-tight truncate">
                  Information Console
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 px-2 sm:px-2.5 pt-2.5 sm:pt-3 pb-2.5 sm:pb-3 overflow-y-auto">
            <ButtonPanel
              direction="vertical"
              activeView={activeView}
              onViewChange={handleViewChange}
              selectedLocationIdx={selectedLocationIdx}
              onLocationChange={handleLocationChange}
              selectedCameraIdx={selectedCameraIdx}
              onCameraChange={handleCameraChange}
              pickedDateIsos={pickedDateIsos}
              onPickedDatesChange={handlePickDatesChange}
            />
          </div>

          <div
            className="
              px-3.5
              sm:px-4
              py-2.5
              border-t
              border-[#c6cddb]
              bg-white/40
              text-[10px]
              sm:text-[11px]
              text-[#475569]
              space-y-1
            "
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-semibold text-[#0f172a]">System Status</p>
              <Link
                href="/logs"
                aria-label="Open system logs page"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  px-2
                  py-1
                  rounded-md
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                  text-white
                  bg-gradient-to-b
                  from-[#0b3d91]
                  to-[#092f70]
                  border
                  border-[#082457]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_-1px_rgba(11,61,145,0.4)]
                  hover:brightness-110
                  active:translate-y-[1px]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0b3d91]
                  focus-visible:ring-offset-1
                  focus-visible:ring-offset-white
                  transition-all
                  duration-[100ms]
                  ease-out
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
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <path d="M14 3v6h6" />
                  <path d="M8 13h8M8 17h5" />
                </svg>
                Logs
              </Link>
            </div>
            <p className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"
              />
              {isArchiveMode ? 'Archive mode' : 'Live channel'}
            </p>
            <p className="text-[#64748b] font-mono text-[10px]">
              v1.0.0 · {todayIso}
            </p>
          </div>
        </aside>

        <section className="relative flex-1 min-w-0 min-h-0 h-full flex flex-col overflow-hidden">
          <div
            className="
              flex
              items-center
              justify-between
              px-3.5
              sm:px-5
              py-2
              sm:py-2.5
              border-b
              border-[#dbe1ec]
              bg-white/60
              shrink-0
            "
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                aria-hidden="true"
                className="shrink-0 w-[3px] h-5 rounded-full bg-[#0b3d91]"
              />
              <div className="flex items-center gap-2.5 min-w-0">
                <h2 className="font-semibold text-[13px] sm:text-sm text-[#0f172a] truncate">
                  Display Console
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#eef2f7] border border-[#cbd2df] text-[10px] font-mono text-[#475569]">
                  {LOCATIONS[selectedLocationIdx]} · CAM-{String(selectedCameraIdx + 1).padStart(2, '0')}
                </span>
                {isArchiveMode ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b3d91]/10 border border-[#0b3d91]/30 text-[10px] font-mono text-[#0b3d91] font-semibold">
                    ARCHIVE · {pickedDateIsos.length}d
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] text-[#475569]">
              <Link
                href="/logs"
                aria-label="View system logs"
                className="
                  hidden
                  sm:inline-flex
                  items-center
                  gap-1.5
                  px-2
                  py-0.5
                  rounded
                  border
                  border-[#cbd2df]
                  bg-white
                  text-[#475569]
                  font-medium
                  hover:border-[#0b3d91]/60
                  hover:text-[#0b3d91]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0b3d91]
                  focus-visible:ring-offset-1
                  transition-all
                  duration-[100ms]
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
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <path d="M14 3v6h6" />
                  <path d="M8 13h8M8 17h5" />
                </svg>
                Logs
              </Link>
              <div
                className={`
                  flex
                  items-center
                  gap-1.5
                  px-2
                  py-0.5
                  rounded
                  border
                  font-medium
                  ${
                    isArchiveMode
                      ? 'bg-[#0b3d91]/10 border-[#0b3d91]/30 text-[#0b3d91]'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isArchiveMode ? 'bg-[#0b3d91]' : 'bg-emerald-600 animate-pulse'
                  }`}
                />
                {isArchiveMode ? 'Archive' : 'Live'}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden">
            <DisplayArea activeView={activeView} {...displayProps} />
          </div>
        </section>
      </div>
    </div>
  );
}
