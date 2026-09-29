import type { StyleSpecification } from 'maplibre-gl';

/** Adapta o Positron mantendo fontes, atribuições e regras de visibilidade. */
export function minimalMapStyle(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    layers: style.layers.filter((layer) => !/poi|airport|shield|railway|boundary/.test(layer.id)).map((layer) => {
      if (layer.type === 'background') {
        return { ...layer, paint: { ...layer.paint, 'background-color': '#F5F3EE' } };
      }
      if (layer.type === 'fill') {
        const color = layer.id === 'water' ? '#D8E5EA'
          : /park|wood/.test(layer.id) ? '#DEE7D8'
          : layer.id === 'building' ? '#EAE7E0' : '#F5F3EE';
        return { ...layer, paint: { ...layer.paint, 'fill-color': color, 'fill-outline-color': color } };
      }
      if (layer.type === 'line') {
        const color = layer.id === 'waterway' ? '#D8E5EA'
          : /casing|subtle/.test(layer.id) ? '#E4E2DC'
          : /minor|path/.test(layer.id) ? '#F9F8F5' : '#FFFFFF';
        return { ...layer, paint: { ...layer.paint, 'line-color': color } };
      }
      if (layer.type === 'symbol') {
        return { ...layer, paint: { ...layer.paint, 'text-color': '#666666', 'text-halo-color': '#F5F3EE' } };
      }
      return layer;
    }),
  };
}
