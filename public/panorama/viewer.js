const views = window.panoramaViews;
let selected = views[0];
const viewer = window.pannellum.viewer('panorama', {
  default: { firstScene: selected.id },
  scenes: Object.fromEntries(views.map(view => [view.id, { type: 'equirectangular', panorama: view.image, ...(view.projection || {}) }])),
  type: 'equirectangular',
  autoLoad: true,
  hfov: 100,
  minHfov: 50,
  maxHfov: 120,
  pitch: -8,
  mouseZoom: 'fullscreenonly',
  draggable: true,
  showZoomCtrl: true,
  showFullscreenCtrl: true,
  compass: false,
  escapeHTML: true,
  strings: {
    loadingLabel: 'Carregando vista 360°…',
    loadButtonLabel: 'Explorar vista 360°',
    fileAccessError: 'Não foi possível carregar a imagem. Recarregue a página para tentar novamente.',
    genericWebGLError: 'Seu navegador não conseguiu abrir a vista 360°. Tente usar um navegador com suporte a WebGL.',
    textureSizeError: 'A imagem é maior do que este dispositivo suporta. Experimente abrir em outro dispositivo.',
    unknownError: 'Não foi possível abrir a vista 360°. Recarregue a página para tentar novamente.',
  },
});

const floors = [[10, '10º andar'], [5, '5º andar'], [1, '1º andar'], [0, 'Térreo']];
const times = [['day', 'Dia', '☀'], ['dawn', 'Amanhecer', '☼'], ['dusk', 'Entardecer', '◒'], ['night', 'Noite', '☾']];
const floorControls = document.getElementById('floor-controls');
const timeControls = document.getElementById('time-controls');
const northControl = document.getElementById('north-control');
const status = document.getElementById('view-status');

function selectView(view) {
  if (!view || selected.id === view.id) return;
  selected = view;
  viewer.loadScene(view.id, view.projection?.pitch ?? -8, 0, view.projection?.hfov ?? 100);
  updateControls();
}

for (const [floor, label] of floors) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'floor';
  button.dataset.floor = floor;
  button.innerHTML = `<span>${label}</span><span class="windows" aria-hidden="true"><i></i><i></i><i></i></span>`;
  button.addEventListener('click', () => selectView(views.find(v => v.floor === floor && v.time === selected.time) || views.find(v => v.floor === floor)));
  floorControls.append(button);
}
for (const [time, label, icon] of times) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.time = time;
  button.innerHTML = `<span aria-hidden="true">${icon}</span>${label}`;
  button.addEventListener('click', () => selectView(views.find(v => v.floor === selected.floor && v.time === time)));
  timeControls.append(button);
}
function updateControls() {
  for (const button of floorControls.children) {
    const floor = Number(button.dataset.floor);
    button.disabled = !views.some(v => v.floor === floor);
    button.setAttribute('aria-pressed', String(selected.floor === floor));
    button.title = button.disabled ? 'Imagem deste andar ainda não disponível' : '';
  }
  for (const button of timeControls.children) {
    button.disabled = !views.some(v => v.floor === selected.floor && v.time === button.dataset.time);
    button.setAttribute('aria-pressed', String(selected.time === button.dataset.time));
    button.title = button.disabled ? 'Imagem deste horário ainda não disponível' : '';
  }
  northControl.disabled = !Number.isFinite(selected.northYaw);
  northControl.title = northControl.disabled ? 'A direção do norte ainda precisa ser definida para esta imagem' : 'Olhar para o norte';
  status.textContent = selected.illustrative ? (selected.time === 'night' ? 'Noite · imagem ilustrativa parcial' : 'Dia · vista ilustrativa 360°') : `${floors.find(f => f[0] === selected.floor)[1]} · ${times.find(t => t[0] === selected.time)[1]}`;
}
northControl.addEventListener('click', () => {
  if (Number.isFinite(selected.northYaw)) viewer.lookAt(0, selected.northYaw, undefined, matchMedia('(prefers-reduced-motion: reduce)').matches ? false : 700);
});
updateControls();

for (const [selector, label] of [
  ['.pnlm-zoom-in', 'Aproximar'],
  ['.pnlm-zoom-out', 'Afastar'],
  ['.pnlm-fullscreen-toggle-button', 'Alternar tela cheia'],
]) {
  const control = document.querySelector(selector);
  if (control) {
    control.title = label;
    control.setAttribute('aria-label', label);
  }
}
