'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getSupabase,
  isSupabaseConfigured,
  type ActivityLogRow,
  type DailyVisitorRow,
  type LogEventType,
} from '@/lib/supabase';
import { logActivity, shouldLogVisit } from '@/lib/activityLogger';

const LOCATIONS = ['Birim', 'Koforidua', 'Tinga', 'Sefwi', 'Tarkwa'] as const;

function todayIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ghanaFormatLong(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return iso;
  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  try {
    return new Intl.DateTimeFormat('en-GH', {
      timeZone: 'Africa/Accra',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dt);
  } catch {
    return iso;
  }
}

function formatAccraTime(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  try {
    return new Intl.DateTimeFormat('en-GH', {
      timeZone: 'Africa/Accra',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(d);
  } catch {
    return isoDate;
  }
}

const EVENT_LABEL: Record<LogEventType, string> = {
  visit: 'Visit',
  location_change: 'Location change',
  camera_change: 'Camera change',
  date_pick: 'Date pick',
  play_confirm: 'Play confirm',
  viewer_open: 'Viewer open',
  viewer_close: 'Viewer close',
};

const EVENT_PILL: Record<LogEventType, string> = {
  visit: 'bg-sky-100 text-sky-800 border-sky-200',
  location_change: 'bg-[#0b3d91]/10 text-[#0b3d91] border-[#0b3d91]/30',
  camera_change: 'bg-amber-50 text-amber-800 border-amber-200',
  date_pick: 'bg-violet-50 text-violet-800 border-violet-200',
  play_confirm: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  viewer_open: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
  viewer_close: 'bg-rose-50 text-rose-800 border-rose-200',
};

function buildMockRows(): ActivityLogRow[] {
  const rows: ActivityLogRow[] = [];
  const events: LogEventType[] = [
    'visit',
    'location_change',
    'camera_change',
    'date_pick',
    'play_confirm',
    'viewer_open',
    'viewer_close',
  ];
  const now = Date.now();
  for (let i = 0; i < 60; i++) {
    const event = events[Math.floor(Math.random() * events.length)];
    const location = Math.floor(Math.random() * LOCATIONS.length);
    const camera = Math.random() > 0.5 ? Math.floor(Math.random() * 6) : null;
    const ts = new Date(now - i * (2 * 60 * 1000) - Math.floor(Math.random() * 25_000));
    rows.push({
      id: `mock_${i}_${ts.getTime().toString(36)}`,
      created_at: ts.toISOString(),
      event_type: event,
      location_idx: ['visit', 'viewer_close'].includes(event) ? null : location,
      camera_idx: camera,
      picked_date_iso: event === 'date_pick' || event === 'play_confirm' ? todayIso(new Date(now - i * 86_400_000)) : null,
      visitor_session_id: `s_${(i % 7).toString(16)}`,
      ip_address: null,
      user_agent: null,
      path: i % 3 === 0 ? '/logs' : '/',
      detail: {},
    });
  }
  return rows;
}

function buildMockDaily(daysBack = 14): DailyVisitorRow[] {
  const rows: DailyVisitorRow[] = [];
  const today = new Date();
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = todayIso(d);
    rows.push({
      visitor_date: iso,
      count: Math.max(1, 12 + Math.floor(Math.sin(i) * 6) + Math.floor(Math.random() * 40)),
      updated_at: new Date(d.getTime() + 23 * 3600 * 1000).toISOString(),
    });
  }
  return rows;
}

function SummCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-[#cbd5e1] bg-white shadow-[0_2px_8px_-4px_rgba(15,23,42,0.15)] p-3.5 sm:p-4">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#475569]">
        {label}
      </p>
      <p className={`mt-1.5 font-bold text-xl sm:text-2xl font-mono ${accent ?? 'text-[#0f172a]'}`}>
        {value}
      </p>
    </div>
  );
}

export default function LogsPage() {
  const configured = useMemo(() => isSupabaseConfigured(), []);
  const [nowMs] = useState<number>(() => Date.now());
  const [rows, setRows] = useState<ActivityLogRow[]>(() =>
    configured ? [] : buildMockRows(),
  );
  const [daily, setDaily] = useState<DailyVisitorRow[]>(() =>
    configured ? [] : buildMockDaily(14),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<'all' | LogEventType>('all');

  useEffect(() => {
    if (!shouldLogVisit()) return;
    void logActivity({ event_type: 'visit' });
  }, []);

  const refresh = useCallback(async () => {
    const sb = getSupabase();
    if (!sb) {
      setRows(buildMockRows());
      setDaily(buildMockDaily(14));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [logsRes, dailyRes] = await Promise.all([
        sb
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500),
        sb
          .from('daily_visitors')
          .select('*')
          .order('visitor_date', { ascending: false })
          .limit(14),
      ]);
      if (logsRes.error) throw logsRes.error;
      if (dailyRes.error) throw dailyRes.error;
      setRows((logsRes.data ?? []) as ActivityLogRow[]);
      setDaily((dailyRes.data ?? []) as DailyVisitorRow[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    const id = window.setTimeout(async () => {
      if (cancelled) return;
      await refresh();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [configured, refresh]);

  const summary = useMemo(() => {
    const base = new Date(nowMs);
    const today = todayIso(base);
    const todayVisits =
      daily.find((d) => d.visitor_date === today)?.count ?? 0;
    const yesterday = todayIso(new Date(nowMs - 86_400_000));
    const yVisits =
      daily.find((d) => d.visitor_date === yesterday)?.count ?? 0;
    const total7 = daily
      .slice(0, 7)
      .reduce((sum, d) => sum + (d.count ?? 0), 0);
    const totalVisits = rows.length;
    return { todayVisits, yVisits, total7, totalVisits };
  }, [daily, rows, nowMs]);

  const filtered = useMemo(() => {
    if (eventFilter === 'all') return rows;
    return rows.filter((r) => r.event_type === eventFilter);
  }, [rows, eventFilter]);

  const maxDaily = useMemo(
    () => daily.reduce((m, d) => Math.max(m, d.count ?? 0), 0),
    [daily],
  );

  return (
    <div className="w-full min-h-full flex bg-[#e7ecf3]">
      <div className="w-full max-w-6xl mx-auto px-3.5 sm:px-5 md:px-7 py-3.5 sm:py-5">
        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
          <Link
            href="/"
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
            Console
          </Link>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="shrink-0 w-[3px] h-5 rounded-full bg-[#0b3d91]" />
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-[#475569]">
              System Logs
            </p>
            <div
              className={`
                flex
                items-center
                gap-1.5
                px-2
                py-0.5
                rounded
                text-[11px]
                font-semibold
                font-mono
                border
                ${
                  configured
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : 'border-amber-300 bg-amber-50 text-amber-800'
                }
              `}
            >
              {configured ? '● Connected' : '● Demo data'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
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
              border-[#0b3d91]/60
              bg-[#0b3d91]
              text-white
              text-[11px]
              sm:text-[12px]
              font-semibold
              shadow-[0_2px_6px_-2px_rgba(11,61,145,0.55)]
              hover:bg-[#0a357d]
              active:translate-y-[1px]
              disabled:opacity-60
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
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
            >
              <path d="M21 12a9 9 0 1 1-3-6.7" />
              <path d="M21 3v6h-6" />
            </svg>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {error ? (
          <div className="mb-3 sm:mb-4 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-[11px] sm:text-[12px] px-3 py-2 font-mono">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          <SummCard label="Today · Visitors" value={summary.todayVisits.toLocaleString()} accent="text-[#0b3d91]" />
          <SummCard label="Yesterday · Visitors" value={summary.yVisits.toLocaleString()} />
          <SummCard label="Last 7 days" value={summary.total7.toLocaleString()} accent="text-emerald-700" />
          <SummCard label="Stored events" value={summary.totalVisits.toLocaleString()} accent="text-violet-700" />
        </div>

        <div className="rounded-xl border border-[#cbd5e1] bg-white shadow-[0_2px_8px_-4px_rgba(15,23,42,0.15)] p-3.5 sm:p-4 mb-3 sm:mb-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#475569]">
              Daily visitors · last 14
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono text-[#64748b]">
              Peak {maxDaily.toLocaleString()}
            </p>
          </div>
          <div
            className="
              grid
              grid-cols-7
              sm:grid-cols-14
              gap-1.5
              items-end
              h-[120px]
              sm:h-[140px]
            "
            style={{
              gridTemplateColumns:
                'repeat(14, minmax(0, 1fr))',
            }}
          >
            {daily.map((d) => {
              const pct = maxDaily > 0 ? Math.max(4, (d.count / maxDaily) * 100) : 4;
              const weekend = new Date(`${d.visitor_date}T12:00:00Z`).getDay();
              return (
                <div key={d.visitor_date} className="flex flex-col items-center gap-1.5 min-w-0">
                  <div
                    className="w-full rounded-md bg-gradient-to-b from-[#0b3d91] to-[#0a357d] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    style={{ height: `${pct}%` }}
                    title={`${ghanaFormatLong(d.visitor_date)} · ${d.count.toLocaleString()}`}
                  />
                  <p
                    className={`font-mono text-[9px] sm:text-[10px] leading-none truncate w-full text-center ${
                      weekend === 0 || weekend === 6 ? 'text-[#0b3d91] font-semibold' : 'text-[#64748b]'
                    }`}
                  >
                    {d.visitor_date.slice(5)}
                  </p>
                </div>
              );
            })}
            {daily.length === 0 ? (
              <div className="col-span-full flex items-center justify-center h-full text-[11px] text-[#64748b] font-mono">
                No visitor data yet.
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-[#cbd5e1] bg-white shadow-[0_2px_8px_-4px_rgba(15,23,42,0.15)]">
          <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 border-b border-[#e2e8f0]">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#475569] flex-1 min-w-0">
              Activity events
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <select
                aria-label="Filter by event type"
                value={eventFilter}
                onChange={(e) =>
                  setEventFilter(e.target.value as 'all' | LogEventType)
                }
                className="
                  h-8
                  sm:h-9
                  px-2
                  sm:px-2.5
                  rounded-lg
                  border
                  border-[#cbd5e1]
                  bg-white
                  text-[11px]
                  sm:text-[12px]
                  font-semibold
                  text-[#0f172a]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#0b3d91]
                "
              >
                <option value="all">All events</option>
                <option value="visit">Visit</option>
                <option value="location_change">Location change</option>
                <option value="camera_change">Camera change</option>
                <option value="date_pick">Date pick</option>
                <option value="play_confirm">Play confirm</option>
                <option value="viewer_open">Viewer open</option>
                <option value="viewer_close">Viewer close</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] sm:text-[12px] border-collapse">
              <thead className="bg-[#f1f5f9] text-[#475569]">
                <tr>
                  <th className="px-3 sm:px-4 py-2 font-semibold font-mono w-[180px]">Time (Accra)</th>
                  <th className="px-3 sm:px-4 py-2 font-semibold">Event</th>
                  <th className="px-3 sm:px-4 py-2 font-semibold">Location</th>
                  <th className="px-3 sm:px-4 py-2 font-semibold">Camera</th>
                  <th className="px-3 sm:px-4 py-2 font-semibold hidden md:table-cell">Date pick</th>
                  <th className="px-3 sm:px-4 py-2 font-semibold hidden lg:table-cell">Session</th>
                </tr>
              </thead>
              <tbody>
                {loading && rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 sm:px-4 py-10 text-center text-[#64748b] font-mono"
                    >
                      Loading activity logs…
                    </td>
                  </tr>
                ) : null}
                {!loading && filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 sm:px-4 py-10 text-center text-[#64748b] font-mono"
                    >
                      No events matching this filter.
                    </td>
                  </tr>
                ) : null}
                {filtered.slice(0, 200).map((r, i) => (
                  <tr
                    key={r.id}
                    className={`${
                      i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'
                    } border-t border-[#e2e8f0] hover:bg-[#0b3d91]/[0.04]`}
                  >
                    <td className="px-3 sm:px-4 py-2 font-mono text-[#64748b] align-top whitespace-nowrap">
                      {formatAccraTime(r.created_at)}
                    </td>
                    <td className="px-3 sm:px-4 py-2 align-top">
                      <span
                        className={`
                          inline-flex
                          items-center
                          px-2
                          py-0.5
                          rounded
                          text-[10px]
                          sm:text-[11px]
                          font-semibold
                          border
                          ${EVENT_PILL[r.event_type]}
                        `}
                      >
                        {EVENT_LABEL[r.event_type]}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 align-top">
                      {r.location_idx !== null && r.location_idx !== undefined
                        ? `${LOCATIONS[r.location_idx] ?? '?'} (${r.location_idx + 1})`
                        : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 align-top font-mono">
                      {r.camera_idx !== null && r.camera_idx !== undefined
                        ? `CAM ${(r.camera_idx + 1).toString().padStart(2, '0')}`
                        : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 align-top hidden md:table-cell font-mono">
                      {r.picked_date_iso ?? '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 align-top hidden lg:table-cell font-mono text-[#64748b]">
                      {r.visitor_session_id?.slice(0, 12) ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-t border-[#e2e8f0] text-[10px] sm:text-[11px] text-[#64748b] font-mono">
            <span>Showing {Math.min(200, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} events</span>
            <span>Accra (GMT) · en-GH</span>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-[#64748b] font-mono">
          {configured
            ? 'Schema: supabase/migrations/0001_schema.sql · daily_visitors auto-increment via PG trigger on visit events.'
            : 'Set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to wire to Supabase.'}
        </div>
      </div>
    </div>
  );
}
