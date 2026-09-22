import { useMemo } from 'react';
import type { ViewType, LocationType } from './DisplayArea';
import VintageButton from './VintageButton';

const LOCATIONS: LocationType[] = [
  'Birim',
  'Koforidua',
  'Tinga',
  'Sefwi',
  'Tarkwa',
];

export interface ButtonPanelProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  direction?: 'horizontal' | 'vertical';
  selectedLocationIdx: number;
  onLocationChange: (idx: number) => void;
  selectedCameraIdx: number;
  onCameraChange: (idx: number) => void;
  pickedDateIso: string;
  onPickedDateChange: (iso: string) => void;
}

const FeedIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="m3 9 5-5 4 4 3-3 6 6" />
    <circle cx="7.5" cy="16.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

function CamIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3 h-3 shrink-0"
      aria-hidden="true"
    >
      <path d="M3 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
      <path d="m16 10 5-2.5v9L16 14" />
    </svg>
  );
}

const GHANA_TZ = 'Africa/Accra';

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

function isoFromGhanaParts(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function ghanaTodayIso() {
  const p = ghanaDateParts(new Date());
  return isoFromGhanaParts(p.year, p.month, p.day);
}

function parseIso(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { year: y, month: m, day: d };
}

function ghanaFormatLong(iso: string) {
  const { year, month, day } = parseIso(iso);
  const d = new Date(Date.UTC(year, month - 1, day, 12));
  return d.toLocaleDateString('en-GH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function ghanaDaysInMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
}

function ghanaMonthHeader(year: number, month: number) {
  const d = new Date(Date.UTC(year, month - 1, 1, 12));
  return d.toLocaleDateString('en-GH', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function ButtonPanel({
  activeView,
  onViewChange,
  direction = 'vertical',
  selectedLocationIdx,
  onLocationChange,
  selectedCameraIdx,
  onCameraChange,
  pickedDateIso,
  onPickedDateChange,
}: ButtonPanelProps) {
  const gap = direction === 'vertical' ? 'gap-1.5' : 'gap-2 sm:gap-3 md:gap-4';
  const flexDir =
    direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap sm:flex-nowrap';
  const role = direction === 'vertical' ? 'navigation' : 'toolbar';

  const todayIso = useMemo(() => ghanaTodayIso(), []);
  const { year: pickedYear, month: pickedMonth, day: pickedDay } = useMemo(
    () => parseIso(pickedDateIso),
    [pickedDateIso],
  );

  const gridCells = useMemo(() => {
    const firstDow = new Date(
      Date.UTC(pickedYear, pickedMonth - 1, 1, 12),
    ).getUTCDay();
    const daysInMonth = ghanaDaysInMonth(pickedYear, pickedMonth);
    const prevMonth = pickedMonth === 1 ? 12 : pickedMonth - 1;
    const prevYear = pickedMonth === 1 ? pickedYear - 1 : pickedYear;
    const daysInPrev = ghanaDaysInMonth(prevYear, prevMonth);
    const cells: {
      iso: string;
      day: number;
      inMonth: boolean;
      isToday: boolean;
      isPicked: boolean;
    }[] = [];
    for (let i = firstDow - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const iso = isoFromGhanaParts(prevYear, prevMonth, d);
      cells.push({ iso, day: d, inMonth: false, isToday: iso === todayIso, isPicked: iso === pickedDateIso });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = isoFromGhanaParts(pickedYear, pickedMonth, d);
      cells.push({ iso, day: d, inMonth: true, isToday: iso === todayIso, isPicked: iso === pickedDateIso });
    }
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const nextMonth = pickedMonth === 12 ? 1 : pickedMonth + 1;
      const nextYear = pickedMonth === 12 ? pickedYear + 1 : pickedYear;
      const idx = cells.length - (firstDow + daysInMonth) + 1;
      const iso = isoFromGhanaParts(nextYear, nextMonth, idx);
      cells.push({ iso, day: idx, inMonth: false, isToday: iso === todayIso, isPicked: iso === pickedDateIso });
      if (cells.length >= 42) break;
    }
    return cells;
  }, [pickedYear, pickedMonth, pickedDateIso, todayIso]);

  const decMonth = () => {
    const m = pickedMonth === 1 ? 12 : pickedMonth - 1;
    const y = pickedMonth === 1 ? pickedYear - 1 : pickedYear;
    const d = Math.min(pickedDay, ghanaDaysInMonth(y, m));
    onPickedDateChange(isoFromGhanaParts(y, m, d));
  };
  const incMonth = () => {
    const m = pickedMonth === 12 ? 1 : pickedMonth + 1;
    const y = pickedMonth === 12 ? pickedYear + 1 : pickedYear;
    const d = Math.min(pickedDay, ghanaDaysInMonth(y, m));
    onPickedDateChange(isoFromGhanaParts(y, m, d));
  };

  const cameraCount = 6;

  return (
    <div className={`w-full flex ${flexDir} ${gap}`} role={role} aria-label="Display control buttons">
      <div className={direction === 'vertical' ? 'space-y-1.5' : 'flex flex-wrap gap-2'}>
        <p
          className="
            px-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#475569]
          "
        >
          View
        </p>
        <div className={`flex ${flexDir} ${gap}`}>
          <VintageButton
            direction={direction}
            label="Live Feed"
            ariaLabel="Show location feed"
            active={activeView === 'feed'}
            variant="primary"
            onClick={() => onViewChange('feed')}
            icon={FeedIcon}
          />
        </div>
      </div>

      {direction === 'vertical' && (
        <>
          <div className="w-full h-px bg-[#c6cddb]/70 my-1" />
          <div className="space-y-1.5">
            <p
              className="
                px-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#475569]
              "
            >
              Location
            </p>
            <div className="px-0.5">
              <label className="block">
                <span className="sr-only">Select station location</span>
                <div className="relative">
                  <select
                    value={selectedLocationIdx}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      onLocationChange(idx);
                      onCameraChange(0);
                    }}
                    aria-label="Select station location"
                    className="
                      w-full
                      appearance-none
                      rounded-md
                      border
                      border-[#cbd2df]
                      bg-white
                      px-2.5
                      py-1.5
                      pr-8
                      text-[12px]
                      font-semibold
                      text-[#0f172a]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_1px_0_rgba(15,23,42,0.06)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#0b3d91]
                      focus:ring-offset-1
                      focus:ring-offset-white
                      transition-all
                      duration-[100ms]
                    "
                  >
                    {LOCATIONS.map((loc, idx) => (
                      <option key={loc} value={idx}>
                        {loc} — STN-{pad2(idx + 1)}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      right-0
                      flex
                      items-center
                      px-2
                      text-[#0b3d91]
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="w-full h-px bg-[#c6cddb]/70 my-1" />
          <div className="space-y-1.5">
            <div className="px-2 flex items-center justify-between gap-2">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#475569]
                "
              >
                Camera
              </p>
              <span className="text-[10px] font-mono text-[#64748b]">
                {LOCATIONS[selectedLocationIdx]} · #{selectedCameraIdx + 1}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 px-0.5">
              {Array.from({ length: cameraCount }, (_, i) => {
                const selected = i === selectedCameraIdx;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onCameraChange(i)}
                    aria-label={`Select camera ${i + 1}`}
                    aria-pressed={selected}
                    className={[
                      'group flex flex-col items-center justify-center gap-0.5 rounded-md px-1 py-1.5 transition-all duration-[100ms] border',
                      selected
                        ? 'bg-[#092f70] text-white border-[#07275d] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(15,23,42,0.2)]'
                        : 'bg-white/70 hover:bg-white text-[#0f172a] border-[#cbd2df] hover:border-[#aeb7c7] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_0_rgba(15,23,42,0.06)] active:translate-y-[1px]',
                    ].join(' ')}
                  >
                    <span className={selected ? 'text-white/85' : 'text-[#0b3d91]'}>
                      <CamIcon />
                    </span>
                    <span className="font-mono text-[10px] font-semibold leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full h-px bg-[#c6cddb]/70 my-1" />
          <div className="space-y-1.5">
            <div className="px-2 flex items-center justify-between gap-2">
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#475569]
                "
              >
                Archive Date
              </p>
              <span className="text-[10px] font-mono text-[#64748b]">GMT</span>
            </div>
            <div className="px-0.5 space-y-1">
              <div className="flex items-center justify-between gap-1 px-1">
                <button
                  type="button"
                  onClick={decMonth}
                  aria-label="Previous month"
                  className="h-6 w-6 flex items-center justify-center rounded-md border border-[#cbd2df] bg-white/80 hover:bg-white text-[#0f172a] active:translate-y-[1px] transition-all duration-[100ms]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="m15 6-6 6 6 6" />
                  </svg>
                </button>
                <p className="text-[11px] font-semibold text-[#0f172a] text-center flex-1 truncate">
                  {ghanaMonthHeader(pickedYear, pickedMonth)}
                </p>
                <button
                  type="button"
                  onClick={incMonth}
                  aria-label="Next month"
                  className="h-6 w-6 flex items-center justify-center rounded-md border border-[#cbd2df] bg-white/80 hover:bg-white text-[#0f172a] active:translate-y-[1px] transition-all duration-[100ms]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-[2px] px-0.5 text-center text-[9px] font-semibold uppercase tracking-wider text-[#64748b] mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <span key={d} className="py-0.5">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-[2px] px-0.5">
                {gridCells.map((c, i) => {
                  const dim = !c.inMonth;
                  const btnCls = [
                    'relative h-6 w-full rounded text-[10px] font-medium border transition-all duration-[100ms]',
                    c.isPicked
                      ? 'bg-[#0b3d91] text-white border-[#092f70] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(15,23,42,0.2)]'
                      : c.isToday
                        ? 'bg-[#dbeafe] text-[#092f70] border-[#93c5fd] font-semibold hover:bg-[#bfdbfe] active:translate-y-[1px]'
                        : dim
                          ? 'bg-transparent text-[#94a3b8] border-transparent hover:bg-white/50'
                          : 'bg-white/80 hover:bg-white text-[#0f172a] border-[#cbd2df] hover:border-[#aeb7c7] active:translate-y-[1px]',
                  ].join(' ');
                  return (
                    <button
                      key={`${c.iso}-${i}`}
                      type="button"
                      onClick={() => {
                        onPickedDateChange(c.iso);
                      }}
                      className={btnCls}
                      aria-label={`Select ${c.iso}`}
                      aria-pressed={c.isPicked}
                    >
                      {c.day}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  onPickedDateChange(todayIso);
                }}
                className="w-full mt-1 text-[10px] text-[#0b3d91] font-semibold hover:text-[#092f70] underline underline-offset-2"
              >
                Today · {todayIso}
              </button>

              <p className="px-0.5 mt-1 text-[10px] text-[#64748b] leading-snug">
                {ghanaFormatLong(pickedDateIso)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
