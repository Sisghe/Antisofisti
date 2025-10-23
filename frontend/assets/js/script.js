(function() {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    initHeader();
    initAnimation();
    addListeners();
    setupNavigation();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        points = [];
        for(let x = 0; x < width; x += width / 20) {
            for(let y = 0; y < height; y += height / 20) {
                let px = x + Math.random() * width / 20;
                let py = y + Math.random() * height / 20;
                let p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        for(let i = 0; i < points.length; i++) {
            let closest = [];
            let p1 = points[i];
            for(let j = 0; j < points.length; j++) {
                let p2 = points[j];
                if (p1 === p2) continue;
                if (closest.length < 5) {
                    closest.push(p2);
                } else {
                    for (let k = 0; k < 5; k++) {
                        if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                            closest[k] = p2;
                            break;
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        for (let i in points) {
            let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(156,217,249,0.3)');
            points[i].circle = c;
        }
    }

    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        let posx = e.pageX || e.clientX;
        let posy = e.pageY || e.clientY;
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        animateHeader = document.body.scrollTop <= height;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function initAnimation() {
        animate();
        for (let i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (let i in points) {
                let p = points[i];
                let dist = getDistance(target, p);
                if (dist < 4000) {
                    p.active = 0.3;
                    p.circle.active = 0.6;
                } else if (dist < 20000) {
                    p.active = 0.1;
                    p.circle.active = 0.3;
                } else if (dist < 40000) {
                    p.active = 0.02;
                    p.circle.active = 0.1;
                } else {
                    p.active = 0;
                    p.circle.active = 0;
                }

                drawLines(p);
                p.circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        gsap.to(p, {
            duration: 1 + 1 * Math.random(),
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: "circ.inOut",
            onComplete: () => shiftPoint(p)
        });
    }

    function drawLines(p) {
    if (!p.active) return;
    for (let i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(224, 224, 224,' + p.active + ')'; // Colore chiaro
        ctx.stroke();
    }
}

    function Circle(pos, rad, color) {
    this.pos = pos;
    this.radius = rad;
    this.color = color;

    this.draw = function() {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(224, 224, 224,' + this.active + ')'; // Colore chiaro
        ctx.fill();
    };
}

    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // NAVIGAZIONE
    function setupNavigation() {
        const guestBtn = document.querySelector('.btn-ospite');
        const loginBtn = document.querySelector('.btn-accesso');
        const registerBtn = document.querySelector('.btn-registrati');

        if (guestBtn) {
            guestBtn.addEventListener('click', function() {
                sessionStorage.removeItem('currentUser');
                window.location.href = 'forum.html';
            });
        }

        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', function() {
                window.location.href = 'registrazione.html';
            });
        }
    }

    // MOTTI ANIMATI
    const motti = [
        "So di non sapere. – Socrate",
        "La vera ignoranza è rifiutare la conoscenza. – Popper",
        "Chi pensa è libero. Chi obbedisce ciecamente è schiavo. – Seneca",
        "Dubita di tutto, ma non del tuo pensiero critico. – Cartesio remix"
    ];

    const mottoEl = document.getElementById('motto');
    const motto = motti[Math.floor(Math.random() * motti.length)];
    let i = 0;

    function scriviMotto() {
        if (i < motto.length) {
            mottoEl.textContent += motto.charAt(i);
            i++;
            setTimeout(scriviMotto, 50);
        }
    }

    window.onload = scriviMotto;
})();