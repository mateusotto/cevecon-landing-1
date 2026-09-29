import { Footprints, Car } from 'lucide-react';
import type { MapPlace } from './mapPlaces';
import styles from './TravelIllustration.module.css';

export default function TravelIllustration({ place }: { place: MapPlace }) {
  return <span className={styles.group}>
    <span className={styles.values}>
      <span><Footprints size={15} aria-hidden="true" />A pé · {place.illustrativeMinutes.walking} min</span>
      <span><Car size={15} aria-hidden="true" />Carro · {place.illustrativeMinutes.driving} min</span>
    </span>
    <small>Tempos ilustrativos</small>
  </span>;
}
