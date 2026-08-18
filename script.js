const canvas = document.getElementById('lissajousCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

const frequencyX = 3;
const frequencyY = 2;
const amplitudeX = 190;
const amplitudeY = 190;
const phase = Math.PI / 2;
const points = 600;

function drawCurve() {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1a73e8';

  for (let i = 0; i <= points; i += 1) {
    const angle = Math.PI * 2 * i / points;
    const x = centerX + amplitudeX * Math.sin(frequencyX * angle + phase);
    const y = centerY + amplitudeY * Math.sin(frequencyY * angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

drawCurve();
