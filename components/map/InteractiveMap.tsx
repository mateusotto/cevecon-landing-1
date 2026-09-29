'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as MapInstance, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAP_CENTER, MAP_STYLE_URL, MAP_ZOOM } from './mapConfig';
import { minimalMapStyle } from './mapStyle';
import styles from './InteractiveMap.module.css';
import MapMarkers from './MapMarkers';
import type { MapPlace } from './mapPlaces';
import MapRoute from './MapRoute';

export default function InteractiveMap({ places, selectedPlaceId, onSelect, focusRevision }: {
  places: MapPlace[]; selectedPlaceId: string | null;
  onSelect: (id: string | null) => void; focusRevision: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [activeMap, setActiveMap] = useState<MapInstance | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let map: MapInstance | undefined;
    let observer: ResizeObserver | undefined;

    async function initialize() {
      try {
        // Importação no cliente e cancelamento antes de criar WebGL: seguro em SSR e StrictMode.
        const [maplibre, response] = await Promise.all([
          import('maplibre-gl'),
          fetch(MAP_STYLE_URL, { signal: controller.signal }),
        ]);
        if (!response.ok) throw new Error(`Map style: ${response.status}`);
        const style = minimalMapStyle(await response.json() as StyleSpecification);
        if (disposed || !container.current || mapRef.current) return;

        maplibre.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');
        map = new maplibre.Map({
          container: container.current,
          style,
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          locale: {
            'NavigationControl.ZoomIn': 'Aproximar',
            'NavigationControl.ZoomOut': 'Afastar',
            'AttributionControl.ToggleAttribution': 'Mostrar atribuições',
          },
        });
        mapRef.current = map;
        setActiveMap(map);
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');
        map.on('load', () => { if (!disposed) setStatus('ready'); });
        map.on('error', () => { if (!disposed) setStatus('error'); });
        map.on('idle', () => { if (!disposed && map?.areTilesLoaded()) setStatus('ready'); });
        observer = new ResizeObserver(() => map?.resize());
        observer.observe(container.current);
      } catch {
        if (!disposed) setStatus('error');
      }
    }

    void initialize();
    return () => {
      disposed = true;
      controller.abort();
      observer?.disconnect();
      map?.remove();
      if (mapRef.current === map) mapRef.current = null;
    };
  }, []);

  return (
    <div className={styles.frame}>
      <section ref={container} className={styles.map} aria-label="Mapa interativo de Canasvieiras" />
      {activeMap && <MapMarkers map={activeMap} places={places} selectedPlaceId={selectedPlaceId} onSelect={onSelect} focusRevision={focusRevision} />}
      {activeMap && <MapRoute map={activeMap} selectedPlaceId={selectedPlaceId} focusRevision={focusRevision} />}
      {status !== 'ready' && (
        <output className={styles.status}>
          {status === 'loading' ? 'Carregando mapa…' : 'Não foi possível carregar o mapa completo. Verifique sua conexão e recarregue a página.'}
        </output>
      )}
    </div>
  );
}
