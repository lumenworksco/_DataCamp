// Cursor spotlight and gentle tilt on certificate previews, count-up stats, copy credential IDs.
(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;

    // spotlight follows the pointer inside each card
    document.querySelectorAll('.card').forEach(function (card) {
        card.addEventListener('pointermove', function (e) {
            var r = card.getBoundingClientRect();
            card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
            card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        }, { passive: true });
    });

    // certificate previews tilt toward the cursor
    if (!reduce && fine) {
        document.querySelectorAll('.cert-thumb').forEach(function (t) {
            t.addEventListener('pointermove', function (e) {
                var r = t.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
                t.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
                t.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
            }, { passive: true });
            t.addEventListener('pointerleave', function () { t.style.removeProperty('--ry'); t.style.removeProperty('--rx'); });
        });
    }

    // stats count up once when they scroll into view
    var nums = document.querySelectorAll('[data-count]');
    if (nums.length && 'IntersectionObserver' in window && !reduce) {
        nums.forEach(function (n) { n.textContent = '0'; });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                io.unobserve(en.target);
                var el = en.target, end = parseInt(el.getAttribute('data-count'), 10), t0 = performance.now(), dur = 1100;
                (function tick(now) {
                    var p = Math.min(1, (now - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = String(Math.round(end * eased));
                    if (p < 1) requestAnimationFrame(tick);
                })(t0);
            });
        }, { threshold: 0.6 });
        nums.forEach(function (n) { io.observe(n); });
    }

    // copy credential IDs
    document.querySelectorAll('.copy-id').forEach(function (b) {
        b.addEventListener('click', function () {
            var id = b.getAttribute('data-copy');
            var done = function (ok) {
                b.textContent = ok ? 'Copied' : 'Press Ctrl+C';
                b.classList.toggle('done', ok);
                setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('done'); }, 1600);
            };
            try { navigator.clipboard.writeText(id).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
        });
    });

    // the year-in-order timeline reveals month by month
    var months = document.querySelectorAll('.jm');
    if (months.length && 'IntersectionObserver' in window && !reduce) {
        months.forEach(function (m) { if (m.getBoundingClientRect().top > window.innerHeight * 0.9) m.classList.add('pre'); });
        var mo = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('seen'); mo.unobserve(en.target); } });
        }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
        months.forEach(function (m) { mo.observe(m); });
    }
})();
