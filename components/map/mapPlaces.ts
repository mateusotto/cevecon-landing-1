export type PlaceCategory = 'education' | 'market' | 'bakery' | 'health' | 'leisure' | 'restaurant';
export interface Coordinates { longitude: number; latitude: number }
export interface MapPlace {
  id: string;
  name: string;
  category: PlaceCategory;
  coordinates: Coordinates;
  distance: string;
  isMock: boolean;
  illustrativeMinutes: { walking: number; driving: number };
}

export const DEVELOPMENT = {
  name: 'Empreendimento',
  address: 'Rua dos Eucaliptos, 43 - Canasvieiras, Florianópolis - SC',
  // Referência provisória de Canasvieiras, NÃO geocodificada para o número 1302.
  // Substituir aqui pelas coordenadas confirmadas do empreendimento.
  coordinates: { longitude: -48.4506985, latitude: -27.4287531 },
  coordinatesConfirmed: true,
};

export const PLACE_CATEGORIES: Record<PlaceCategory, string> = {
  education: 'Educação', market: 'Mercados', bakery: 'Padarias e cafés',
  health: 'Saúde', leisure: 'Lazer', restaurant: 'Gastronomia',
};

function nearby(longitudeOffset: number, latitudeOffset: number): Coordinates {
  return {
    longitude: DEVELOPMENT.coordinates.longitude + longitudeOffset,
    latitude: DEVELOPMENT.coordinates.latitude + latitudeOffset,
  };
}

// DADOS DE TESTE: locais, posições e distâncias fictícios, sem cálculo de trajetos.
// Serão substituídos por estabelecimentos reais numa etapa posterior.
export const MAP_PLACES: MapPlace[] = [
  { id: 'school-01', name: 'Escola Exemplo', category: 'education', coordinates: nearby(-.0035, .0015), distance: '650 m', isMock: true, illustrativeMinutes: { walking: 7, driving: 10 } },
  { id: 'market-01', name: 'Mercado Exemplo', category: 'market', coordinates: nearby(.0032, .0018), distance: '800 m', isMock: true, illustrativeMinutes: { walking: 8, driving: 12 } },
  { id: 'bakery-01', name: 'Padaria Exemplo', category: 'bakery', coordinates: nearby(-.0018, -.0018), distance: '450 m', isMock: true, illustrativeMinutes: { walking: 5, driving: 8 } },
  { id: 'health-01', name: 'Clínica Exemplo', category: 'health', coordinates: nearby(.0045, -.0027), distance: '1,1 km', isMock: true, illustrativeMinutes: { walking: 11, driving: 15 } },
  { id: 'leisure-01', name: 'Parque Exemplo', category: 'leisure', coordinates: nearby(-.005, -.0038), distance: '900 m', isMock: true, illustrativeMinutes: { walking: 9, driving: 13 } },
  { id: 'restaurant-01', name: 'Restaurante Exemplo', category: 'restaurant', coordinates: nearby(.0008, -.004), distance: '700 m', isMock: true, illustrativeMinutes: { walking: 7, driving: 11 } },
  { id: 'coffee-02', name: 'Café Exemplo', category: 'bakery', coordinates: nearby(.0065, -.005), distance: '1,3 km', isMock: true, illustrativeMinutes: { walking: 13, driving: 17 } },
  { id: 'market-02', name: 'Supermercado Exemplo', category: 'market', coordinates: nearby(-.007, -.006), distance: '1,5 km', isMock: true, illustrativeMinutes: { walking: 15, driving: 20 } },
];
