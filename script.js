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
  amplitudeY: document.getElementById('amplitudeY')
};

const values = {
  freqX: document.getElementById('freqXValue'),
  freqY: document.getElementById('freqYValue'),
  phase: document.getElementById('phaseValue'),
  amplitudeX: document.getElementById('amplitudeXValue'),
  amplitudeY: document.getElementById('amplitudeYValue')
};

const points = 700;

function readSettings() {
  return {
    frequencyX: parseFloat(inputs.freqX.value),
    frequencyY: parseFloat(inputs.freqY.value),
    phase: parseFloat(inputs.phase.value) * Math.PI / 180,
    amplitudeX: parseFloat(inputs.amplitudeX.value),
    amplitudeY: parseFloat(inputs.amplitudeY.value)
  };
}

function updateLabels() {
  values.freqX.textContent = parseFloat(inputs.freqX.value).toFixed(1);
  values.freqY.textContent = parseFloat(inputs.freqY.value).toFixed(1);
  values.phase.textContent = `${inputs.phase.value}°`;
  values.amplitudeX.textContent = inputs.amplitudeX.value;
  values.amplitudeY.textContent = inputs.amplitudeY.value;
}

function drawCurve() {
  const settings = readSettings();
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1a73e8';

  for (let i = 0; i <= points; i += 1) {
    const angle = Math.PI * 2 * i / points;
    const x = centerX + settings.amplitudeX * Math.sin(settings.frequencyX * angle + settings.phase);
    const y = centerY + settings.amplitudeY * Math.sin(settings.frequencyY * angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

function refresh() {
  updateLabels();
  drawCurve();
}

Object.values(inputs).forEach((input) => {
  input.addEventListener('input', refresh);
});

refresh();
