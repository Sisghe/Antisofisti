// forum.js - SOLO ANIMAZIONE SFONDO
(function() {
  let width, height, canvas, ctx, points;

  initHeader();
  animate();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;

    const largeHeader = document.getElementById('large-header');
    largeHeader.style.height = height + 'px';

    canvas = document.getElementById('demo-canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // genera punti casuali
    points = [];
    for (let x = 0; x < width; x += width / 20) {
      for (let y = 0; y < height; y += height / 20) {
        let px = x + Math.random() * width / 20;
        let py = y + Math.random() * height / 20;
        points.push({ x: px, y: py });
      }
    }
  }
// forum-animation.js - modifica i colori
// ... resto del codice ...

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(224, 224, 224, 0.3)'; // Colore chiaro per le particelle
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

// ... resto del codice ...
})();