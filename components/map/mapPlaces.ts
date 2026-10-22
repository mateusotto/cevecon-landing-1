export type PlaceCategory = 'education' | 'market' | 'health' | 'leisure' | 'services';
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
  coordinates: { longitude: -48.450757410027705, latitude: -27.432097087881573 },
  coordinatesConfirmed: true,
};

export const PLACE_CATEGORIES: Record<PlaceCategory, string> = {
  education: 'Educação', market: 'Mercados', health: 'Saúde', leisure: 'Lazer', services: 'Serviços',
};

export const MAP_PLACES: MapPlace[] = [
  { id: 'sapiens-parque', name: 'Sapiens Parque', category: 'leisure', coordinates: { longitude: -48.44216876898832, latitude: -27.431175080567886 }, distance: '1,1 km', isMock: false, illustrativeMinutes: { walking: 14, driving: 6 } },
  { id: 'cevecon-office', name: 'Escritório CEVECON', category: 'services', coordinates: { longitude: -48.44193430193683, latitude: -27.431356677847415 }, distance: '1,1 km', isMock: false, illustrativeMinutes: { walking: 14, driving: 6 } },
  { id: 'imperatriz', name: 'Supermercado Imperatriz', category: 'market', coordinates: { longitude: -48.457735484610744, latitude: -27.432606944600906 }, distance: '800 m', isMock: false, illustrativeMinutes: { walking: 11, driving: 5 } },
  { id: 'drogaraia', name: 'Drogaraia', category: 'health', coordinates: { longitude: -48.45802951264426, latitude: -27.432175397009235 }, distance: '850 m', isMock: false, illustrativeMinutes: { walking: 11, driving: 5 } },
  { id: 'policia-militar', name: 'Polícia Militar', category: 'services', coordinates: { longitude: -48.45830612843382, latitude: -27.433961142650983 }, distance: '900 m', isMock: false, illustrativeMinutes: { walking: 12, driving: 5 } },
  { id: 'caixa-economica', name: 'Caixa Econômica Federal', category: 'services', coordinates: { longitude: -48.45863605280989, latitude: -27.433902877699722 }, distance: '950 m', isMock: false, illustrativeMinutes: { walking: 12, driving: 5 } },
  { id: 'acesso-rodovia', name: 'Acesso à rodovia', category: 'services', coordinates: { longitude: -48.458091406091626, latitude: -27.434442730085912 }, distance: '950 m', isMock: false, illustrativeMinutes: { walking: 13, driving: 5 } },
  { id: 'escola-infantil', name: 'Escola infantil', category: 'education', coordinates: { longitude: -48.4566460377503, latitude: -27.433827034225903 }, distance: '650 m', isMock: false, illustrativeMinutes: { walking: 8, driving: 4 } },
  { id: 'escola', name: 'Escola', category: 'education', coordinates: { longitude: -48.45600986528081, latitude: -27.432956600902173 }, distance: '600 m', isMock: false, illustrativeMinutes: { walking: 8, driving: 4 } },
  { id: 'trapiche', name: 'Trapiche de Canasvieiras', category: 'leisure', coordinates: { longitude: -48.45024460145107, latitude: -27.425323203218316 }, distance: '750 m', isMock: false, illustrativeMinutes: { walking: 10, driving: 5 } },
  { id: 'praia', name: 'Praia de Canasvieiras', category: 'leisure', coordinates: { longitude: -48.450088052546874, latitude: -27.42619259311593 }, distance: '650 m', isMock: false, illustrativeMinutes: { walking: 8, driving: 4 } },
  { id: 'jbs-inovacao', name: 'Centro de Inovação JBS', category: 'services', coordinates: { longitude: -48.44670843797173, latitude: -27.432168691887753 }, distance: '400 m', isMock: false, illustrativeMinutes: { walking: 5, driving: 3 } },
  { id: 'angeloni-futuro', name: 'Futuras instalações — Mercado Angeloni', category: 'market', coordinates: { longitude: -48.448642799938696, latitude: -27.432265398184633 }, distance: '200 m', isMock: false, illustrativeMinutes: { walking: 3, driving: 2 } },
];
