// Force-directed network of credentials and the skills they teach. Plain canvas, no libraries.
// The same information is in the list under the canvas, so nothing depends on the picture.
(function () {
    var data = window.NET, canvas = document.getElementById('net');
    if (!data || !canvas) return;
    var card = document.getElementById('net-card');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);

    var nodes = [], links = [];
    data.skills.forEach(function (s, i) {
        nodes.push({ kind: 'skill', name: s.name, deg: s.creds.length, creds: s.creds, i: i });
    });
    var credNodes = data.creds.map(function (c) {
        var n = { kind: 'cred', name: c.title, type: c.type, skills: c.skills };
        nodes.push(n);
        return n;
    });
    var skillByName = {};
    nodes.forEach(function (n) { if (n.kind === 'skill') skillByName[n.name] = n; });
    credNodes.forEach(function (c) {
        c.skills.forEach(function (s) { links.push({ a: c, b: skillByName[s] }); });
    });
    nodes.forEach(function (n, i) {
        var a = (i / nodes.length) * Math.PI * 2;
        n.x = Math.cos(a) * 200; n.y = Math.sin(a) * 200; n.vx = 0; n.vy = 0;
        n.r = n.kind === 'skill' ? 4 + Math.sqrt(n.deg) * 3.2 : 4.5;
    });

    var hover = null, drag = null, alpha = 1;

    function resize() {
        var r = canvas.parentElement.getBoundingClientRect();
        W = r.width; H = Math.max(420, Math.min(680, W * 0.62));
        canvas.width = W * dpr; canvas.height = H * dpr;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        alpha = Math.max(alpha, 0.6);
    }

    function step() {
        var k = alpha;
        for (var i = 0; i < nodes.length; i++) {
            var p = nodes[i];
            for (var j = i + 1; j < nodes.length; j++) {
                var q = nodes[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy + 0.01;
                if (d2 > 250000) continue;
                var f = (p.r + q.r + 44) * (p.r + q.r + 44) / d2 * 0.9 * k;
                var d = Math.sqrt(d2);
                dx = dx / d * f; dy = dy / d * f;
                p.vx += dx; p.vy += dy; q.vx -= dx; q.vy -= dy;
            }
            p.vx -= p.x * 0.005 * k; p.vy -= p.y * 0.009 * k;
        }
        links.forEach(function (l) {
            var dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
            var want = 70 + 8 * l.b.deg, f = (d - want) * 0.045 * k;
            dx = dx / d * f; dy = dy / d * f;
            l.a.vx += dx; l.a.vy += dy; l.b.vx -= dx; l.b.vy -= dy;
        });
        nodes.forEach(function (n) {
            if (n === drag) return;
            n.vx *= 0.82; n.vy *= 0.82;
            n.x += n.vx; n.y += n.vy;
        });
        alpha *= 0.985;
    }

    function related(n) {
        var set = new Set([n]);
        if (n.kind === 'skill') n.creds.forEach(function (i) { set.add(credNodes[i]); });
        else n.skills.forEach(function (s) { set.add(skillByName[s]); });
        return set;
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.save();
        ctx.translate(W / 2, H / 2);
        var rel = hover ? related(hover) : null;
        links.forEach(function (l) {
            var on = rel && rel.has(l.a) && rel.has(l.b) && (l.a === hover || l.b === hover);
            ctx.strokeStyle = on ? 'rgba(55,222,138,0.85)' : rel ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)';
            ctx.lineWidth = on ? 1.4 : 1;
            ctx.beginPath(); ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y); ctx.stroke();
        });
        nodes.forEach(function (n) {
            var dim = rel && !rel.has(n);
            ctx.globalAlpha = dim ? 0.18 : 1;
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (n === hover ? 2 : 0), 0, Math.PI * 2);
            ctx.fillStyle = n.kind === 'skill' ? '#37de8a' : '#8c8c8c';
            ctx.fill();
            if (n === hover) { ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.stroke(); }
            var label = n.kind === 'skill' && (n.deg > 1 || (rel && rel.has(n)) || n === hover);
            if (label) {
                ctx.font = (n.deg > 2 ? '12' : '11') + 'px "DM Mono", monospace';
                ctx.fillStyle = dim ? 'rgba(232,232,232,0.4)' : '#e8e8e8';
                ctx.textAlign = 'center';
                ctx.fillText(n.name, n.x, n.y - n.r - 6);
            }
        });
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    function pick(e) {
        var r = canvas.getBoundingClientRect();
        var x = e.clientX - r.left - W / 2, y = e.clientY - r.top - H / 2, best = null, bd = 1e9;
        nodes.forEach(function (n) {
            var d = Math.hypot(n.x - x, n.y - y);
            if (d < n.r + 9 && d < bd) { bd = d; best = n; }
        });
        return best;
    }

    function describe(n) {
        var t = card.querySelector('.net-card-title'), s = card.querySelector('.net-card-sub');
        if (!n) { t.textContent = 'Nothing selected'; s.textContent = 'Hover a dot.'; return; }
        if (n.kind === 'skill') {
            t.textContent = n.name;
            s.textContent = n.deg + ' credential' + (n.deg > 1 ? 's' : '') + ': ' + n.creds.map(function (i) { return data.creds[i].title; }).join(', ');
        } else {
            t.textContent = n.name;
            s.textContent = n.type + ' · ' + n.skills.join(', ');
        }
    }

    canvas.addEventListener('pointermove', function (e) {
        if (drag) {
            var r = canvas.getBoundingClientRect();
            drag.x = e.clientX - r.left - W / 2; drag.y = e.clientY - r.top - H / 2; alpha = Math.max(alpha, 0.35);
            return;
        }
        var n = pick(e);
        if (n !== hover) { hover = n; describe(n); canvas.style.cursor = n ? 'pointer' : 'default'; }
    });
    canvas.addEventListener('pointerdown', function (e) {
        var n = pick(e);
        hover = n; describe(n);
        if (n) { drag = n; drag.moved = false; canvas.setPointerCapture(e.pointerId); }
    });
    canvas.addEventListener('pointerup', function (e) {
        var n = drag; drag = null;
        if (n && n.kind === 'skill' && !n.moved && e.pointerType !== 'touch') {
            window.location.href = 'all.html?skill=' + encodeURIComponent(n.name);
        }
    });
    canvas.addEventListener('pointerleave', function () { if (!drag) { hover = null; describe(null); } });
    canvas.addEventListener('pointermove', function () { if (drag) drag.moved = true; });
    canvas.style.touchAction = 'none';

    window.addEventListener('resize', resize);
    resize();
    if (reduce) { for (var i = 0; i < 400; i++) step(); alpha = 0; draw(); }
    (function loop() {
        if (alpha > 0.002) step();
        draw();
        requestAnimationFrame(loop);
    })();
})();
