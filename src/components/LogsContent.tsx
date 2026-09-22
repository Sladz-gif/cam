'use client';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'OK' | 'WARN' | 'ERROR';
  source: string;
  message: string;
}

const LOGS: LogEntry[] = [
  {
    id: 'L-001',
    time: '09:12:04',
    level: 'OK',
    source: 'services.boot',
    message: 'All display services started successfully.',
  },
  {
    id: 'L-002',
    time: '09:14:21',
    level: 'INFO',
    source: 'channel.router',
    message: 'Home channel loaded; 4 entries cached.',
  },
  {
    id: 'L-003',
    time: '09:18:47',
    level: 'WARN',
    source: 'video.stream',
    message: 'Sample source missing — waiting for /videos/sample.mp4.',
  },
  {
    id: 'L-004',
    time: '09:22:03',
    level: 'INFO',
    source: 'clock.synced',
    message: 'Date reference re-synchronised with local clock.',
  },
];

function levelColor(level: LogEntry['level']): string {
  switch (level) {
    case 'OK':
      return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    case 'INFO':
      return 'bg-[#0b3d91]/[0.08] border-[#0b3d91]/30 text-[#092f70]';
    case 'WARN':
      return 'bg-amber-50 border-amber-200 text-amber-800';
    case 'ERROR':
      return 'bg-red-50 border-red-200 text-red-700';
  }
}

export default function LogsContent() {
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
      <div className="w-full h-full max-w-5xl mx-auto flex flex-col gap-3 sm:gap-4 min-h-0">
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
              System Logs
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
              border
              border-[#e2e8f0]
              bg-white
              text-[#475569]
            "
          >
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#64748b]"
            />
            {LOGS.length} entries
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col gap-2 sm:gap-2.5 overflow-hidden">
          {LOGS.map((entry) => (
            <div
              key={entry.id}
              className="
                group
                w-full
                rounded-lg
                border
                border-[#cbd5e1]
                bg-white
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                hover:border-[#0b3d91]/40
                px-3
                sm:px-3.5
                py-2.5
                sm:py-3
                transition
                duration-150
              "
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div
                  className={[
                    'shrink-0 mt-0.5 px-1.5 py-0.5 rounded border text-[10px] font-mono font-bold tracking-wider',
                    levelColor(entry.level),
                  ].join(' ')}
                >
                  {entry.level}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <p className="text-[13px] sm:text-[14px] font-semibold text-[#0f172a] leading-snug">
                    {entry.message}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] sm:text-[11px] font-mono text-[#64748b]">
                    <span>{entry.id}</span>
                    <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
                    <span>{entry.time}</span>
                    <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
                    <span className="truncate">{entry.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            pt-2
            border-t
            border-[#e2e8f0]
          "
        >
          <p className="text-[10px] sm:text-[11px] text-[#64748b] font-mono truncate">
            Log window · last 4 events
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#64748b] font-mono">
            Transport · local-internal
          </p>
        </div>
      </div>
    </div>
  );
}
