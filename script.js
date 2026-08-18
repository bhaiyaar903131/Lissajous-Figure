const canvas = document.getElementById('lissajousCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

const inputs = {
  freqX: document.getElementById('freqX'),
  freqY: document.getElementById('freqY'),
  phase: document.getElementById('phase'),
  amplitudeX: document.getElementById('amplitudeX'),
  amplitudeY: document.getElementById('amplitudeY'),
  speed: document.getElementById('speed')
};

const values = {
  freqX: document.getElementById('freqXValue'),
  freqY: document.getElementById('freqYValue'),
  phase: document.getElementById('phaseValue'),
  amplitudeX: document.getElementById('amplitudeXValue'),
  amplitudeY: document.getElementById('amplitudeYValue'),
  speed: document.getElementById('speedValue')
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
    speed: parseFloat(inputs.speed.value)
  };
}

function updateLabels() {
  values.freqX.textContent = parseFloat(inputs.freqX.value).toFixed(1);
  values.freqY.textContent = parseFloat(inputs.freqY.value).toFixed(1);
  values.phase.textContent = `${inputs.phase.value}°`;
  values.amplitudeX.textContent = inputs.amplitudeX.value;
  values.amplitudeY.textContent = inputs.amplitudeY.value;
  values.speed.textContent = parseFloat(inputs.speed.value).toFixed(1);
}

function drawCurve(settings) {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1a73e8';

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
  const settings = readSettings();
  drawCurve(settings);
  time += 0.008;
  requestAnimationFrame(animate);
}

function refreshLabels() {
  updateLabels();
  time = 0;
}

Object.values(inputs).forEach((input) => {
  input.addEventListener('input', refreshLabels);
});

updateLabels();
animate();
