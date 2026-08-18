const canvas = document.getElementById('lissajousCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const resetButton = document.getElementById('resetButton');

const inputs = {
  freqX: document.getElementById('freqX'),
  freqY: document.getElementById('freqY'),
  phase: document.getElementById('phase'),
  amplitudeX: document.getElementById('amplitudeX'),
  amplitudeY: document.getElementById('amplitudeY'),
  speed: document.getElementById('speed'),
  lineWidth: document.getElementById('lineWidth'),
  lineColor: document.getElementById('lineColor')
};

const values = {
  freqX: document.getElementById('freqXValue'),
  freqY: document.getElementById('freqYValue'),
  phase: document.getElementById('phaseValue'),
  amplitudeX: document.getElementById('amplitudeXValue'),
  amplitudeY: document.getElementById('amplitudeYValue'),
  speed: document.getElementById('speedValue'),
  lineWidth: document.getElementById('lineWidthValue'),
  lineColor: document.getElementById('lineColorValue')
};

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

const points = 700;
let time = 0;

function readSettings() {
  return {
    frequencyX: parseFloat(inputs.freqX.value),
    frequencyY: parseFloat(inputs.freqY.value),
    phase: parseFloat(inputs.phase.value) * Math.PI / 180,
    amplitudeX: parseFloat(inputs.amplitudeX.value),
    amplitudeY: parseFloat(inputs.amplitudeY.value),
    speed: parseFloat(inputs.speed.value),
    lineWidth: parseFloat(inputs.lineWidth.value),
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
}

function drawCurve(settings) {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = settings.lineWidth;
  ctx.strokeStyle = settings.lineColor;
  ctx.lineJoin = 'round';

  for (let i = 0; i <= points; i += 1) {
    const angle = Math.PI * 2 * i / points;
    const motion = time * settings.speed;
    const x = centerX + settings.amplitudeX * Math.sin(settings.frequencyX * angle + settings.phase + motion);
    const y = centerY + settings.amplitudeY * Math.sin(settings.frequencyY * angle + motion);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

function animate() {
  drawCurve(readSettings());
  time += 0.008;
  requestAnimationFrame(animate);
}

function handleInput() {
  updateLabels();
  time = 0;
}

function resetValues() {
  Object.entries(defaults).forEach(([key, value]) => {
    inputs[key].value = value;
  });
  handleInput();
}

Object.values(inputs).forEach((input) => {
  input.addEventListener('input', handleInput);
});

resetButton.addEventListener('click', resetValues);
updateLabels();
animate();
