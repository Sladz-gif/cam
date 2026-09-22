import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type LogEventType =
  | 'visit'
  | 'location_change'
  | 'camera_change'
  | 'date_pick'
  | 'play_confirm'
  | 'viewer_open'
  | 'viewer_close';

export interface ActivityLogRow {
  id: string;
  created_at: string;
  event_type: LogEventType;
  location_idx: number | null;
  camera_idx: number | null;
  picked_date_iso: string | null;
  visitor_session_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  path: string | null;
  detail: Record<string, unknown> | null;
}

export interface DailyVisitorRow {
  visitor_date: string;
  count: number;
  updated_at: string;
}

const NEXT_PUBLIC_SUPABASE_URL =
  (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_SUPABASE_URL : undefined) ??
  (typeof window !== 'undefined'
    ? (window as unknown as { __NEXT_PUBLIC_SUPABASE_URL?: string }).__NEXT_PUBLIC_SUPABASE_URL
    : undefined);

const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  (typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ??
  (typeof window !== 'undefined'
    ? (window as unknown as { __NEXT_PUBLIC_SUPABASE_ANON_KEY?: string }).__NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined);

let clientSingleton: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (clientSingleton) return clientSingleton;
  try {
    clientSingleton = createClient(
      NEXT_PUBLIC_SUPABASE_URL as string,
      NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    return clientSingleton;
  } catch {
    return null;
  }
}

export function newSessionId(): string {
  const rand = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  return rand;
}
