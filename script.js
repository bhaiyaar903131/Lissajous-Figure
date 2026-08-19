const canvas = document.getElementById('lissajousCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const resetButton = document.getElementById('resetButton');
const pauseButton = document.getElementById('pauseButton');
const ratioValue = document.getElementById('ratioValue');

const controlKeys = [
  'freqX',
  'freqY',
  'phase',
  'amplitudeX',
  'amplitudeY',
  'speed',
  'lineWidth',
  'lineColor'
];

const inputs = {};
const values = {};

controlKeys.forEach((key) => {
  inputs[key] = document.getElementById(key);
  values[key] = document.getElementById(`${key}Value`);
});

const defaults = {
  freqX: '3',
  freqY: '2',
  phase: '90',
  amplitudeX: '180',
  amplitudeY: '180',
  speed: '0.8',
  lineWidth: '2',
  lineColor: '#1a73e8'
};

const points = 760;
let time = 0;
let paused = false;

function readSettings() {
  const frequencyX = Number(inputs.freqX.value);
  const frequencyY = Number(inputs.freqY.value);

  return {
    frequencyX,
    frequencyY,
    phase: Number(inputs.phase.value) * Math.PI / 180,
    amplitudeX: Number(inputs.amplitudeX.value),
    amplitudeY: Number(inputs.amplitudeY.value),
    speed: Number(inputs.speed.value),
    lineWidth: Number(inputs.lineWidth.value),
    lineColor: inputs.lineColor.value
  };
}

function updateLabels() {
  const settings = readSettings();
  values.freqX.textContent = settings.frequencyX.toFixed(1);
  values.freqY.textContent = settings.frequencyY.toFixed(1);
  values.phase.textContent = `${inputs.phase.value}°`;
  values.amplitudeX.textContent = inputs.amplitudeX.value;
  values.amplitudeY.textContent = inputs.amplitudeY.value;
  values.speed.textContent = settings.speed.toFixed(1);
  values.lineWidth.textContent = settings.lineWidth.toFixed(1);
  values.lineColor.textContent = settings.lineColor;
  ratioValue.textContent = `${settings.frequencyX.toFixed(1)} : ${settings.frequencyY.toFixed(1)}`;
}

function pointOnCurve(settings, angle, motion) {
  const xWave = settings.frequencyX * angle + settings.phase + motion;
  const yWave = settings.frequencyY * angle + motion;
  const x = centerX + settings.amplitudeX * Math.sin(xWave);
  const y = centerY + settings.amplitudeY * Math.sin(yWave);

  return { x, y };
}

function drawCurve(settings) {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = settings.lineWidth;
  ctx.strokeStyle = settings.lineColor;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const motion = time * settings.speed;

  for (let i = 0; i <= points; i += 1) {
    const angle = Math.PI * 2 * i / points;
    const point = pointOnCurve(settings, angle, motion);

    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }

  ctx.stroke();
}

function animate() {
  const settings = readSettings();
  drawCurve(settings);

  if (!paused) {
    time += 0.008;
  }

  requestAnimationFrame(animate);
}

function handleInput() {
  updateLabels();
  time = 0;
}

function resetValues() {
  controlKeys.forEach((key) => {
    inputs[key].value = defaults[key];
  });

  paused = false;
  pauseButton.textContent = 'Pause';
  handleInput();
}

function togglePause() {
  paused = !paused;
  pauseButton.textContent = paused ? 'Resume' : 'Pause';
}

controlKeys.forEach((key) => {
  inputs[key].addEventListener('input', handleInput);
});

resetButton.addEventListener('click', resetValues);
pauseButton.addEventListener('click', togglePause);
updateLabels();
animate();
