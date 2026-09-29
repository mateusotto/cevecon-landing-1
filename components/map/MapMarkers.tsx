'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Building2 } from 'lucide-react';
import type { Map as MapInstance, Marker, Popup } from 'maplibre-gl';
import { DEVELOPMENT, MAP_PLACES, PLACE_CATEGORIES, type MapPlace, type PlaceCategory } from './mapPlaces';
import { categoryIcons } from './categoryIcons';
import styles from './MapMarkers.module.css';
import TravelIllustration from './TravelIllustration';

interface MarkerView { id: string; element: HTMLElement; popup: Popup; category?: PlaceCategory; travelHost: HTMLElement; place?: MapPlace }

export default function MapMarkers({ map, places, selectedPlaceId, onSelect, focusRevision }: {
  map: MapInstance; places: MapPlace[]; selectedPlaceId: string | null;
  onSelect: (id: string | null) => void; focusRevision: number;
}) {
  const [views, setViews] = useState<MarkerView[]>([]);
  const selectRef = useRef(onSelect);
  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    let disposed = false;
    const markers: Marker[] = [];
    const popups: Popup[] = [];
    const cleanups: (() => void)[] = [];

    async function setup() {
      const { Marker, Popup } = await import('maplibre-gl');
      if (disposed) return;
      const nextViews: MarkerView[] = [];
      const points = [
        { id: 'development', name: DEVELOPMENT.name, coordinates: DEVELOPMENT.coordinates },
        ...MAP_PLACES,
      ];
      for (const point of points) {
        const place = 'category' in point ? point : undefined;
        const element = document.createElement('button');
        element.type = 'button';
        element.className = `${styles.marker} ${place ? styles.poi : styles.development}`;
        element.setAttribute('aria-label', place ? `${place.name} — ${PLACE_CATEGORIES[place.category]}` : DEVELOPMENT.name);
        element.setAttribute('aria-expanded', 'false');
        // MapLibre abre via keypress; evita um segundo clique nativo do button.
        const onKeyPress = (event: KeyboardEvent) => {
          if (event.code === 'Enter' || event.code === 'Space') event.preventDefault();
        };
        element.addEventListener('keypress', onKeyPress);
        cleanups.push(() => element.removeEventListener('keypress', onKeyPress));

        // textContent impede que nomes de locais sejam interpretados como HTML.
        const content = document.createElement('div');
        content.className = styles.content;
        const heading = document.createElement('h2');
        heading.textContent = point.name;
        content.appendChild(heading);
        const detail = document.createElement('p');
        detail.textContent = place ? `${PLACE_CATEGORIES[place.category]} · ${place.distance}` : DEVELOPMENT.address;
        content.appendChild(detail);
        const travelHost = document.createElement('div');
        if (place) content.appendChild(travelHost);
        if (place?.isMock || (!place && !DEVELOPMENT.coordinatesConfirmed)) {
          const note = document.createElement('small');
          note.textContent = place ? 'Local e distância fictícios para teste.' : 'Posição provisória — coordenadas a confirmar.';
          content.appendChild(note);
        }
        const popup = new Popup({ offset: place ? 24 : 36, className: styles.popup, maxWidth: '260px', focusAfterOpen: false })
          .setLngLat([point.coordinates.longitude, point.coordinates.latitude]).setDOMContent(content);
        const marker = new Marker({ element, anchor: 'center' })
          .setLngLat([point.coordinates.longitude, point.coordinates.latitude])
          .setPopup(popup).addTo(map);
        const onOpen = () => {
          popups.forEach((other) => { if (other !== popup) other.remove(); });
          element.setAttribute('aria-expanded', 'true');
          selectRef.current(place?.id ?? null);
        };
        const onClose = () => {
          element.setAttribute('aria-expanded', 'false');
        };
        popup.on('open', onOpen);
        popup.on('close', onClose);
        cleanups.push(() => { popup.off('open', onOpen); popup.off('close', onClose); });
        popups.push(popup);
        markers.push(marker);
        nextViews.push({ id: point.id, element, popup, category: place?.category, travelHost, place });
      }
      setViews(nextViews);
    }
    void setup();
    return () => {
      disposed = true;
      cleanups.forEach((cleanup) => cleanup());
      popups.forEach((popup) => popup.remove());
      markers.forEach((marker) => marker.remove());
    };
  }, [map]);

  useEffect(() => {
    const visible = new Set(places.map((place) => place.id));
    for (const view of views) {
      const hidden = !!view.category && !visible.has(view.id);
      view.element.toggleAttribute('hidden', hidden);
      if (hidden) view.popup.remove();
      view.element.classList.toggle(styles.selected, view.id === selectedPlaceId);
      if (view.category) view.element.setAttribute('aria-pressed', String(view.id === selectedPlaceId));
    }
  }, [views, places, selectedPlaceId]);

  useEffect(() => {
    for (const view of views) {
      if (view.id === selectedPlaceId && !view.element.hidden) {
        if (!view.popup.isOpen()) view.popup.addTo(map);
      } else if (view.category || selectedPlaceId) {
        view.popup.remove();
      }
    }
  }, [map, views, selectedPlaceId, focusRevision]);

  return views.flatMap(({ id, element, category, travelHost, place }) => {
    const Icon = category ? categoryIcons[category] : Building2;
    return [createPortal(<>
      <span className={styles.disc}><Icon aria-hidden="true" /></span>
      {!category && <span className={styles.label}>Empreendimento</span>}
    </>, element, id), place ? createPortal(<TravelIllustration place={place} />, travelHost, `${id}-travel`) : null];
  });
}
