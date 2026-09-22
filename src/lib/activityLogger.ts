import {
  getSupabase,
  isSupabaseConfigured,
  newSessionId,
  type LogEventType,
} from './supabase';

const VISITED_KEY = '__rd_visited_session';
const VISIT_COOLDOWN_MS = 30 * 60 * 1000;

type LogPayload = {
  event_type: LogEventType;
  location_idx?: number | null;
  camera_idx?: number | null;
  picked_date_iso?: string | null;
  path?: string | null;
  detail?: Record<string, unknown>;
};

function sessionState(): {
  id: string;
  lastVisitAt: number;
} {
  const now = Date.now();
  if (typeof window === 'undefined') {
    return { id: `s_${now.toString(36)}`, lastVisitAt: 0 };
  }
  try {
    const raw = window.sessionStorage.getItem(VISITED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as {
        id?: string;
        lastVisitAt?: number;
      } | null;
      if (parsed?.id) {
        return {
          id: parsed.id,
          lastVisitAt: typeof parsed.lastVisitAt === 'number' ? parsed.lastVisitAt : 0,
        };
      }
    }
  } catch {
    /* ignore storage errors */
  }
  const id = newSessionId();
  try {
    window.sessionStorage.setItem(
      VISITED_KEY,
      JSON.stringify({ id, lastVisitAt: 0 }),
    );
  } catch {
    /* ignore */
  }
  return { id, lastVisitAt: 0 };
}

function markVisitSent(): void {
  if (typeof window === 'undefined') return;
  try {
    const prev = sessionState();
    window.sessionStorage.setItem(
      VISITED_KEY,
      JSON.stringify({ id: prev.id, lastVisitAt: Date.now() }),
    );
  } catch {
    /* ignore */
  }
}

export function shouldLogVisit(): boolean {
  if (typeof window === 'undefined') return false;
  const { lastVisitAt } = sessionState();
  return Date.now() - lastVisitAt > VISIT_COOLDOWN_MS;
}

export async function logActivity(payload: LogPayload): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  if (!sb) return;
  try {
    const session = sessionState();
    const ua =
      typeof navigator !== 'undefined' ? navigator.userAgent ?? null : null;
    const path =
      payload.path ??
      (typeof window !== 'undefined' ? window.location.pathname + window.location.search : null);
    await sb.from('activity_logs').insert({
      event_type: payload.event_type,
      location_idx: payload.location_idx ?? null,
      camera_idx: payload.camera_idx ?? null,
      picked_date_iso: payload.picked_date_iso ?? null,
      visitor_session_id: session.id,
      ip_address: null,
      user_agent: ua,
      path,
      detail: payload.detail ?? {},
    });
    if (payload.event_type === 'visit') markVisitSent();
  } catch {
    /* swallow logging errors */
  }
}
