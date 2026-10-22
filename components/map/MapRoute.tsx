'use client';

import { useEffect, useState } from 'react';
import type { Map as MapInstance, GeoJSONSource } from 'maplibre-gl';
import type { FeatureCollection } from 'geojson';
import { DEVELOPMENT, MAP_PLACES } from './mapPlaces';
import { getWalkingRoute } from './mapRouting';
import styles from './MapRoute.module.css';

const SOURCE = 'development-walking-route';
const EMPTY: FeatureCollection = { type: 'FeatureCollection', features: [] };

export default function MapRoute({ map, selectedPlaceId, focusRevision }: {
  map: MapInstance; selectedPlaceId: string | null; focusRevision: number;
}) {
  const [status, setStatus] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      if (map.getStyle()) void (map.getSource(SOURCE) as GeoJSONSource | undefined)?.setData(EMPTY);
    };
    const run = () => {
      clear();
      const place = MAP_PLACES.find((point) => point.id === selectedPlaceId);
      if (!place) { setStatus(''); return; }
      setStatus('Traçando rota a pé…');
      timer = setTimeout(async () => {
        try {
          const geometry = await getWalkingRoute(place, controller.signal);
          if (disposed) return;
          if (!map.getSource(SOURCE)) {
            map.addSource(SOURCE, { type: 'geojson', data: EMPTY });
            const before = map.getStyle().layers.find((layer) => layer.type === 'symbol')?.id;
            map.addLayer({ id: `${SOURCE}-outline`, type: 'line', source: SOURCE,
              layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#FFFFFF', 'line-width': 8 } }, before);
            map.addLayer({ id: SOURCE, type: 'line', source: SOURCE,
              layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#155c53', 'line-width': 4 } }, before);
          }
          await (map.getSource(SOURCE) as GeoJSONSource).setData({ type: 'Feature', properties: {}, geometry });
          if (disposed) return;
          const points = [...geometry.coordinates, [DEVELOPMENT.coordinates.longitude, DEVELOPMENT.coordinates.latitude],
            [place.coordinates.longitude, place.coordinates.latitude]];
          const xs = points.map((point) => point[0]);
          const ys = points.map((point) => point[1]);
          map.fitBounds([[Math.min(...xs), Math.min(...ys)], [Math.max(...xs), Math.max(...ys)]], {
            padding: { top: 110, bottom: 85, left: 45, right: 45 }, maxZoom: 16,
            duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
          });
          setStatus('Rota a pé · Trajeto de referência');
        } catch {
          if (!disposed) { clear(); setStatus('Rota indisponível no momento. Selecione o local para tentar novamente.'); }
        }
      }, 250);
    };
    if (map.getSource(SOURCE) || map.isStyleLoaded()) run();
    else map.once('load', run);
    return () => {
      disposed = true;
      controller.abort();
      clearTimeout(timer);
      map.off('load', run);
      clear();
    };
  }, [map, selectedPlaceId, focusRevision]);

  return <div className={styles.info}>
    {status && <output>{status}</output>}
    <span>Rotas: <a href="https://routing.openstreetmap.de/about.html" target="_blank" rel="noreferrer">OSRM / FOSSGIS</a> · <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer">Corrigir mapa</a></span>
  </div>;
}
