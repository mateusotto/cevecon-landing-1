'use client';

import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { PLACE_CATEGORIES, type MapPlace, type PlaceCategory } from './mapPlaces';
import { getPlaceIcon } from './categoryIcons';
import styles from './MapExplorer.module.css';
import TravelIllustration from './TravelIllustration';

export function CategoryFilters({ category, onChange }: {
  category: PlaceCategory | 'all'; onChange: (category: PlaceCategory | 'all') => void;
}) {
  const options = [['all', 'Todos'], ...Object.entries(PLACE_CATEGORIES)] as [PlaceCategory | 'all', string][];
  return (
    <section className={styles.filters} aria-label="Filtrar locais por categoria">
      <h2>Explore os arredores</h2>
      <div className={styles.chips}>
        {options.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={category === id} onClick={() => onChange(id)}>
            {category === id && <Check size={14} aria-hidden="true" />}{label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function PlacesList({ places, selectedPlaceId, onSelect }: {
  places: MapPlace[]; selectedPlaceId: string | null; onSelect: (id: string) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !item) return;
    const bounds = list.getBoundingClientRect();
    const itemBounds = item.getBoundingClientRect();
    const delta = itemBounds.top < bounds.top ? itemBounds.top - bounds.top
      : itemBounds.bottom > bounds.bottom ? itemBounds.bottom - bounds.bottom : 0;
    // Rola apenas o painel, nunca a página toda (incluindo no mobile).
    if (delta) list.scrollBy({ top: delta, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [selectedPlaceId]);

  return (
    <section className={styles.listSection} aria-label="Locais próximos">
      <p className={styles.count} aria-live="polite">{places.length} {places.length === 1 ? 'local' : 'locais'} · Pontos de referência</p>
      <ul ref={listRef} className={styles.list}>
        {places.map((place) => {
          const Icon = getPlaceIcon(place);
          const selected = selectedPlaceId === place.id;
          return (
            <li key={place.id}>
              <button type="button" aria-pressed={selected} onClick={() => onSelect(place.id)} className={styles.item}>
                <span className={styles.icon}><Icon size={19} aria-hidden="true" /></span>
                <span className={styles.details}><strong>{place.name}</strong><span>{PLACE_CATEGORIES[place.category]}</span><TravelIllustration place={place} /></span>
                <span className={styles.distance}>{place.distance}{selected && <Check size={15} aria-label="Selecionado" />}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {!places.length && <p className={styles.empty}>Nenhum local encontrado nesta categoria.</p>}
    </section>
  );
}
