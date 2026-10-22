import { School, ShoppingCart, Coffee, Hospital, Trees, Utensils, Building2, Shield, Landmark, Road, Umbrella, Waves } from 'lucide-react';
import type { MapPlace } from './mapPlaces';

export const categoryIcons = {
  education: School, market: ShoppingCart, bakery: Coffee,
  health: Hospital, leisure: Trees, restaurant: Utensils, services: Building2,
};

export function getPlaceIcon(place: MapPlace) {
  const specificIcons = {
    'policia-militar': Shield,
    'caixa-economica': Landmark,
    'acesso-rodovia': Road,
    trapiche: Waves,
    praia: Umbrella,
  } as const;
  return specificIcons[place.id as keyof typeof specificIcons] ?? categoryIcons[place.category];
}
