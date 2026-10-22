'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InteractiveMap from './InteractiveMap';
import { CategoryFilters, PlacesList } from './MapSidebar';
import { MAP_PLACES, type PlaceCategory } from './mapPlaces';
import { preloadWalkingRoutes } from './mapRouting';
import styles from './MapExplorer.module.css';

export default function MapExplorer() {
  const [category, setCategory] = useState<PlaceCategory | 'all'>('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [focusRevision, setFocusRevision] = useState(0);
  const explorerRef = useRef<HTMLDivElement>(null);
  const places = useMemo(() => MAP_PLACES.filter((place) => category === 'all' || place.category === category), [category]);

  useEffect(() => {
    const explorer = explorerRef.current;
    if (!explorer) return;
    const controller = new AbortController();
    let started = false;
    const startPreload = () => {
      if (started) return;
      started = true;
      void preloadWalkingRoutes(MAP_PLACES, controller.signal);
      observer.disconnect();
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) startPreload();
    }, { rootMargin: '300px 0px' });
    observer.observe(explorer);
    return () => { observer.disconnect(); controller.abort(); };
  }, []);

  function changeCategory(next: PlaceCategory | 'all') {
    setCategory(next);
    if (next !== 'all' && MAP_PLACES.find((place) => place.id === selectedPlaceId)?.category !== next) {
      setSelectedPlaceId(null);
    }
  }

  const selectMarker = useCallback((id: string | null) => setSelectedPlaceId(id), []);
  function selectListItem(id: string) {
    setSelectedPlaceId(id);
    // Permite focar novamente o mesmo local após arrastar o mapa ou fechar o popup.
    setFocusRevision((revision) => revision + 1);
  }

  return (
    <div id="mapa-arredores" ref={explorerRef} className={styles.explorer}>
      <CategoryFilters category={category} onChange={changeCategory} />
      <div className={styles.map}>
        <InteractiveMap places={places} selectedPlaceId={selectedPlaceId} onSelect={selectMarker} focusRevision={focusRevision} />
      </div>
      <PlacesList places={places} selectedPlaceId={selectedPlaceId} onSelect={selectListItem} />
    </div>
  );
}
