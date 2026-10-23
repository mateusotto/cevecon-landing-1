const views = window.panoramaViews;
let selected = views[0];

// Camada temporária para posicionar os pontos antes de fixá-los no projeto.
const debugPlaces = [
  { id: 'empreendimento', name: 'Empreendimento', distance: '0 m', icon: '⌂' },
  { id: 'sapiens-parque', name: 'Sapiens Parque', distance: '1,1 km', icon: '✦' },
  { id: 'cevecon-office', name: 'Escritório CEVECON', distance: '1,1 km', icon: '▦' },
  { id: 'imperatriz', name: 'Supermercado Imperatriz', distance: '800 m', icon: '▤' },
  { id: 'drogaraia', name: 'Drogaraia', distance: '850 m', icon: '+' },
  { id: 'policia-militar', name: 'Polícia Militar', distance: '900 m', icon: '★' },
  { id: 'caixa-economica', name: 'Caixa Econômica Federal', distance: '950 m', icon: '$' },
  { id: 'acesso-rodovia', name: 'Acesso à rodovia', distance: '950 m', icon: '⌁' },
  { id: 'escola-infantil', name: 'Escola infantil', distance: '650 m', icon: '♧' },
  { id: 'escola', name: 'Escola', distance: '600 m', icon: '◇' },
  { id: 'trapiche', name: 'Trapiche de Canasvieiras', distance: '750 m', icon: '≋' },
  { id: 'praia', name: 'Praia de Canasvieiras', distance: '650 m', icon: '☂' },
  { id: 'jbs-inovacao', name: 'Centro de Inovação JBS', distance: '400 m', icon: '⌘' },
];
const defaultPositions = Object.fromEntries(views.map((view) => [
  view.id,
  Object.fromEntries(debugPlaces.map((place, index) => [
    place.id,
    { yaw: ((index * 27) % 150) - 75, pitch: -4 - (index % 4) * 3 },
  ])),
]));
const savedPositionsKey = 'cevecon-panorama-debug-positions-v1';
let debugPositions = defaultPositions;
try {
  const stored = JSON.parse(localStorage.getItem(savedPositionsKey) || 'null');
  if (stored && typeof stored === 'object') {
    debugPositions = Object.fromEntries(views.map((view) => [
      view.id,
      Object.fromEntries(debugPlaces.map((place) => [place.id, {
        ...defaultPositions[view.id][place.id],
        ...(stored[view.id]?.[place.id] || {}),
      }])),
    ]));
  }
} catch { /* armazenamento local indisponível */ }
let debugPlace = debugPlaces[0];

function createTooltip(hotSpotDiv, args) {
  hotSpotDiv.classList.add('pano-hotspot');
  const label = document.createElement('span');
  label.className = 'pano-hotspot-label';
  label.textContent = `${args.name} · ${args.distance}`;
  const icon = document.createElement('span');
  icon.className = 'pano-hotspot-icon';
  icon.textContent = args.icon;
  hotSpotDiv.append(label, icon);
  hotSpotDiv.title = args.name;
  hotSpotDiv.setAttribute('aria-label', args.name);
}

function getHotspot(view, place = debugPlace) {
  return {
    id: `debug-${place.id}`,
    pitch: debugPositions[view.id][place.id].pitch,
    yaw: debugPositions[view.id][place.id].yaw,
    type: 'custom',
    createTooltipFunc: createTooltip,
    createTooltipArgs: place,
  };
}

function getHotspots(view) {
  return view.id === 'terrain' ? debugPlaces.map((place) => getHotspot(view, place)) : [];
}

const viewer = window.pannellum.viewer('panorama', {
  default: { firstScene: selected.id },
  scenes: Object.fromEntries(views.map((view) => [view.id, {
    type: 'equirectangular', panorama: view.image, hotSpots: getHotspots(view),
  }])),
  type: 'equirectangular', autoLoad: true, hfov: 100, minHfov: 50, maxHfov: 120, pitch: -8,
  mouseZoom: 'fullscreenonly', draggable: true, showZoomCtrl: true, showFullscreenCtrl: true,
  compass: false, escapeHTML: true,
  strings: {
    loadingLabel: 'Carregando vista 360°…', loadButtonLabel: 'Explorar vista 360°',
    fileAccessError: 'Não foi possível carregar a imagem. Recarregue a página para tentar novamente.',
    genericWebGLError: 'Seu navegador não conseguiu abrir a vista 360°. Tente usar um navegador com suporte a WebGL.',
    textureSizeError: 'A imagem é maior do que este dispositivo suporta. Experimente abrir em outro dispositivo.',
    unknownError: 'Não foi possível abrir a vista 360°. Recarregue a página para tentar novamente.',
  },
});

const viewControls = document.getElementById('view-controls');
const northControl = document.getElementById('north-control');
const status = document.getElementById('view-status');
const debugSelect = document.getElementById('debug-place');
const debugX = document.getElementById('debug-x');
const debugY = document.getElementById('debug-y');
const debugXValue = document.getElementById('debug-x-value');
const debugYValue = document.getElementById('debug-y-value');
const debugOutput = document.getElementById('debug-output');
const debugCopy = document.getElementById('debug-copy');
const debugSave = document.getElementById('debug-save');

function resolveLabelCollisions() {
  const labels = [...document.querySelectorAll('#panorama .pano-hotspot-label')];
  labels.forEach((label) => { label.style.setProperty('--label-shift', '0px'); });
  const placed = [];
  for (const label of labels.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)) {
    let shift = 0;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      label.style.setProperty('--label-shift', `${shift}px`);
      const rect = label.getBoundingClientRect();
      const collision = placed.find((other) => (
        rect.left < other.right && rect.right > other.left && rect.top < other.bottom && rect.bottom > other.top
      ));
      if (!collision) {
        placed.push(rect);
        break;
      }
      shift -= rect.bottom - collision.top + 6;
    }
  }
}

let collisionFrame = 0;
function scheduleLabelCollisionCheck() {
  cancelAnimationFrame(collisionFrame);
  collisionFrame = requestAnimationFrame(resolveLabelCollisions);
}

for (const place of debugPlaces) {
  const option = document.createElement('option');
  option.value = place.id; option.textContent = place.name; debugSelect.append(option);
}

function currentPosition() { return debugPositions[selected.id][debugPlace.id]; }

function updateDebugControls() {
  const position = currentPosition();
  debugSelect.value = debugPlace.id; debugX.value = String(position.yaw); debugY.value = String(position.pitch);
  debugXValue.value = `${position.yaw}°`; debugYValue.value = `${position.pitch}°`;
  debugOutput.textContent = `${selected.label} · ${debugPlace.name} · yaw: ${position.yaw}°, pitch: ${position.pitch}°`;
}

function replaceHotspot() {
  const position = currentPosition(); const id = `debug-${debugPlace.id}`;
  try { viewer.removeHotSpot(id, selected.id); } catch { /* cena ainda pode estar carregando */ }
  viewer.addHotSpot({ id, pitch: position.pitch, yaw: position.yaw, type: 'custom', createTooltipFunc: createTooltip, createTooltipArgs: debugPlace }, selected.id);
  updateDebugControls();
}

debugSelect.addEventListener('change', () => {
  const previousId = `debug-${debugPlace.id}`;
  try { viewer.removeHotSpot(previousId, selected.id); } catch { /* cena ainda pode estar carregando */ }
  debugPlace = debugPlaces.find((place) => place.id === debugSelect.value) ?? debugPlaces[0];
  if (selected.id === 'terrain') viewer.addHotSpot(getHotspot(selected), selected.id);
  updateDebugControls();
});
debugX.addEventListener('input', () => { currentPosition().yaw = Number(debugX.value); replaceHotspot(); });
debugY.addEventListener('input', () => { currentPosition().pitch = Number(debugY.value); replaceHotspot(); });
debugCopy.addEventListener('click', async () => {
  const position = currentPosition(); const snippet = `{ id: '${debugPlace.id}', pitch: ${position.pitch}, yaw: ${position.yaw} }`;
  try { await navigator.clipboard.writeText(snippet); } catch { /* clipboard pode estar bloqueado em preview local */ }
  debugOutput.textContent = `Copiado: ${snippet}`;
});
debugSave.addEventListener('click', () => {
  try {
    localStorage.setItem(savedPositionsKey, JSON.stringify(debugPositions));
    debugOutput.textContent = `Posição salva para ${debugPlace.name} nesta vista.`;
  } catch {
    debugOutput.textContent = 'Não foi possível salvar nesta sessão.';
  }
});

function selectView(view) {
  if (!view || selected.id === view.id) return;
  selected = view;
  viewer.loadScene(view.id, -8, 0, 100);
  try { viewer.removeHotSpot(`debug-${debugPlace.id}`, selected.id); } catch { /* marcador inicial da cena */ }
  if (selected.id === 'terrain') viewer.addHotSpot(getHotspot(selected), selected.id);
  updateControls(); updateDebugControls();
}

for (const view of views) {
  const button = document.createElement('button'); button.type = 'button'; button.className = 'view-option'; button.textContent = view.label;
  button.addEventListener('click', () => selectView(view)); viewControls.append(button);
}

function updateControls() {
  for (const [index, button] of [...viewControls.children].entries()) button.setAttribute('aria-pressed', String(views[index].id === selected.id));
  northControl.disabled = !Number.isFinite(selected.northYaw);
  northControl.title = northControl.disabled ? 'A direção do norte ainda precisa ser definida para esta imagem' : 'Olhar para o norte';
  status.textContent = selected.illustrative ? 'Vista ilustrativa' : selected.label;
}

northControl.addEventListener('click', () => {
  if (Number.isFinite(selected.northYaw)) viewer.lookAt(0, selected.northYaw, undefined, matchMedia('(prefers-reduced-motion: reduce)').matches ? false : 700);
});

updateControls(); updateDebugControls();
scheduleLabelCollisionCheck();
viewer.on('viewchange', scheduleLabelCollisionCheck);
window.addEventListener('resize', scheduleLabelCollisionCheck);
setInterval(scheduleLabelCollisionCheck, 250);

for (const [selector, label] of [['.pnlm-zoom-in', 'Aproximar'], ['.pnlm-zoom-out', 'Afastar'], ['.pnlm-fullscreen-toggle-button', 'Alternar tela cheia']]) {
  const control = document.querySelector(selector);
  if (control) { control.title = label; control.setAttribute('aria-label', label); }
}
