/**
 * api.js — Smart API Base URL with Auto-Fallback
 *
 * Priority:
 *   1. Local backend  → http://localhost:5000
 *   2. Online backend → https://rstateapi.jtsonline.shop  (auto-fallback)
 *
 * How it works:
 *   - On startup, silently pings local backend's /api/health endpoint.
 *   - If local responds within 3s → uses local.
 *   - If local is down / timeout → switches to online backend.
 *   - Result is cached for the session (no repeated pinging).
 */

const LOCAL_URL  = 'http://localhost:5000';
const ONLINE_URL = 'https://rstateapi.jtsonline.shop';

let resolvedBase = null;      // cached result
let resolvingPromise = null;  // prevents parallel pings

/**
 * Silently check if local backend is alive.
 * Returns true if alive, false otherwise.
 */
async function isLocalAlive() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
    const res = await fetch(`${LOCAL_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Returns the resolved API base URL (with /api suffix).
 * Cached after first call.
 */
export async function getApiBase() {
  if (resolvedBase) return resolvedBase;

  // If already resolving, wait for that promise
  if (resolvingPromise) return resolvingPromise;

  resolvingPromise = isLocalAlive().then((alive) => {
    resolvedBase = alive ? `${LOCAL_URL}/api` : `${ONLINE_URL}/api`;
    const source = alive ? '🟢 Local' : '🌐 Online';
    console.log(`[API] Backend: ${source} → ${resolvedBase}`);
    return resolvedBase;
  });

  return resolvingPromise;
}

/**
 * Returns the resolved server root URL (without /api).
 * Used for file/image URLs.
 */
export async function getServerRoot() {
  const base = await getApiBase();
  return base.replace('/api', '');
}

/**
 * Smart fetch — automatically uses resolved base URL.
 * Drop-in replacement for: fetch(`http://localhost:5000/api/...`)
 *
 * Usage:
 *   import { apiFetch } from '../../utils/api';
 *   const res = await apiFetch('/projects');
 *   const data = await res.json();
 */
export async function apiFetch(endpoint, options = {}) {
  const base = await getApiBase();
  const url  = `${base}${endpoint}`;
  return fetch(url, options);
}

/**
 * Resolves a file URL that starts with '/' to the correct server root.
 * Usage:
 *   import { resolveFileUrl } from '../../utils/api';
 *   const src = await resolveFileUrl(data.image_url);
 */
export async function resolveFileUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path; // already absolute
  const root = await getServerRoot();
  return `${root}${path}`;
}

/**
 * Pre-warms the connection on app load.
 * Call this once in main.jsx so the first real API call is instant.
 */
export function warmupApi() {
  getApiBase(); // fire-and-forget
}
