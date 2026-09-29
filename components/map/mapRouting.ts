import type { LineString } from 'geojson';
import { DEVELOPMENT, type MapPlace } from './mapPlaces';

// Endpoint público para a sandbox. Para produção, configurar um provedor com capacidade adequada.
export const WALKING_ROUTE_URL = 'https://routing.openstreetmap.de/routed-foot/route/v1/foot';
const cache = new Map<string, LineString>();
let nextRequestAt = 0;

export async function getWalkingRoute(place: MapPlace, signal: AbortSignal): Promise<LineString> {
  const origin = DEVELOPMENT.coordinates;
  const destination = place.coordinates;
  const key = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;
  const cached = cache.get(key);
  if (cached) return cached;
  // Respeita no máximo uma consulta por segundo nesta sessão, inclusive em trocas rápidas.
  const wait = Math.max(0, nextRequestAt - Date.now());
  nextRequestAt = Date.now() + wait + 1100;
  await new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, wait);
    if (signal.aborted) abort();
    else signal.addEventListener('abort', abort, { once: true });
  });
  const response = await fetch(`${WALKING_ROUTE_URL}/${key}?overview=full&geometries=geojson&steps=false`, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
  });
  if (!response.ok) throw new Error('Routing unavailable');
  const data = await response.json() as { code?: string; routes?: { geometry?: LineString }[] };
  const geometry = data.routes?.[0]?.geometry;
  if (data.code !== 'Ok' || geometry?.type !== 'LineString' || !Array.isArray(geometry.coordinates)
    || geometry.coordinates.length < 2 || !geometry.coordinates.every((point: unknown) => Array.isArray(point)
      && point.length >= 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]))) {
    throw new Error('No valid route');
  }
  cache.set(key, geometry);
  return geometry;
}
