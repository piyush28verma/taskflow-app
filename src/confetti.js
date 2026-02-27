import { useEffect } from 'react';

let particles = [];
let animFrame = null;
let $canvas = null;
let ctx = null;

function setupCanvas() {
    if ($canvas) return;
    $canvas = document.getElementById('confetti-canvas');
    if (!$canvas) return;

    // just for the success animation
    ctx = $canvas.getContext('2d');

    function resize() {
        $canvas.width = window.innerWidth;
        $canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
}

export function fireConfetti() {
    setupCanvas();
    if (!ctx || !$canvas) return;

    // standard palette for basic confetti
    const colours = ['#e06c50', '#d97706', '#2563eb', '#059669', '#8b5cf6', '#ec4899'];

    for (let i = 0; i < 45; i++) {
        particles.push({
            x: $canvas.width / 2,
            y: $canvas.height / 2 + 50,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 1) * 20 - 5,
            size: Math.random() * 6 + 4,
            color: colours[Math.floor(Math.random() * colours.length)],
            rot: Math.random() * 360,
            grav: 0.5,
            alpha: 1,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        });
    }

    if (!animFrame) tickConfetti();
}

function tickConfetti() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    let active = false;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0) continue;

        active = true;
        p.vy += p.grav;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vx * 2;
        p.alpha -= 0.015;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
    }

    if (active) {
        animFrame = requestAnimationFrame(tickConfetti);
    } else {
        particles = [];
        animFrame = null;
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    }
}
