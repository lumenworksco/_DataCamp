// Certificate viewer. Every preview is still a normal link to its PDF, so without this script
// (or with a modifier key held) it behaves exactly as before. With it, the click opens the
// certificate large, with arrow-key browsing through the current set.
(function () {
    var CREDS = window.CREDS || {};
    var root, imgEl, titleEl, metaEl, idEl, copyBtn, pdfEl, verifyEl, countEl, prevBtn, nextBtn, closeBtn;
    var items = [], index = 0, opener = null, built = false;

    function build() {
        if (built) return;
        built = true;
        root = document.createElement('div');
        root.className = 'lb';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        root.setAttribute('aria-label', 'Certificate viewer');
        root.innerHTML =
            '<div class="lb-back" data-close></div>' +
            '<div class="lb-box">' +
            '<span class="lb-count" aria-live="polite"></span>' +
            '<button type="button" class="lb-close" data-close>Close (Esc)</button>' +
            '<div class="lb-stage">' +
            '<button type="button" class="lb-nav lb-prev" aria-label="Previous certificate">&larr;</button>' +
            '<img class="lb-img" alt="">' +
            '<button type="button" class="lb-nav lb-next" aria-label="Next certificate">&rarr;</button>' +
            '</div>' +
            '<div class="lb-cap"><div><div class="lb-title"></div><div class="lb-meta"></div></div>' +
            '<div class="lb-actions"><span class="lb-id"></span>' +
            '<button type="button" class="lb-btn lb-copy">Copy ID</button>' +
            '<a class="lb-link lb-pdf" target="_blank" rel="noopener">PDF</a>' +
            '<a class="lb-link lb-verify" target="_blank" rel="noopener">Verify on DataCamp</a></div></div>' +
            '</div>';
        document.body.appendChild(root);
        imgEl = root.querySelector('.lb-img');
        titleEl = root.querySelector('.lb-title');
        metaEl = root.querySelector('.lb-meta');
        idEl = root.querySelector('.lb-id');
        copyBtn = root.querySelector('.lb-copy');
        pdfEl = root.querySelector('.lb-pdf');
        verifyEl = root.querySelector('.lb-verify');
        countEl = root.querySelector('.lb-count');
        prevBtn = root.querySelector('.lb-prev');
        nextBtn = root.querySelector('.lb-next');
        closeBtn = root.querySelector('.lb-close');

        root.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
        prevBtn.addEventListener('click', function () { go(-1); });
        nextBtn.addEventListener('click', function () { go(1); });
        copyBtn.addEventListener('click', function () {
            var id = copyBtn.getAttribute('data-id');
            var done = function (ok) {
                copyBtn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
                copyBtn.classList.toggle('done', ok);
                setTimeout(function () { copyBtn.textContent = 'Copy ID'; copyBtn.classList.remove('done'); }, 1500);
            };
            try { navigator.clipboard.writeText(id).then(function () { done(true); }, function () { done(false); }); } catch (err) { done(false); }
        });

        document.addEventListener('keydown', function (e) {
            if (!root.classList.contains('open')) return;
            if (e.key === 'Escape') { e.preventDefault(); close(); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            else if (e.key === 'Tab') trapFocus(e);
        });

        // swipe on touch screens
        var x0 = null;
        root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
        root.addEventListener('touchend', function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            x0 = null;
        }, { passive: true });
    }

    function focusables() {
        return Array.prototype.slice.call(root.querySelectorAll('button, a[href]')).filter(function (n) { return !n.hidden && n.offsetParent !== null; });
    }

    function trapFocus(e) {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    function show(i) {
        index = (i + items.length) % items.length;
        var base = items[index].getAttribute('data-lb');
        var c = CREDS[base] || { title: base, meta: '', id: '', idLabel: 'ID', verify: '' };
        imgEl.classList.add('loading');
        imgEl.onload = function () { imgEl.classList.remove('loading'); };
        imgEl.src = 'assets/certs/lg/' + base + '.webp';
        imgEl.alt = 'Certificate: ' + c.title;
        titleEl.textContent = c.title;
        metaEl.textContent = c.meta;
        idEl.textContent = c.id ? c.idLabel + ': ' + c.id : '';
        copyBtn.hidden = !c.id;
        copyBtn.setAttribute('data-id', c.id);
        pdfEl.href = 'assets/certificates/' + base + '.pdf';
        verifyEl.hidden = !c.verify;
        if (c.verify) verifyEl.href = c.verify;
        countEl.textContent = (index + 1) + ' / ' + items.length;
        var many = items.length > 1;
        prevBtn.hidden = nextBtn.hidden = !many;
        // warm the neighbours so arrow keys feel instant
        if (many) [index - 1, index + 1].forEach(function (k) {
            var n = items[(k + items.length) % items.length].getAttribute('data-lb');
            new Image().src = 'assets/certs/lg/' + n + '.webp';
        });
    }

    function go(d) { if (items.length > 1) show(index + d); }

    function open(trigger) {
        build();
        var group = trigger.getAttribute('data-lb-group');
        items = Array.prototype.slice.call(document.querySelectorAll('[data-lb][data-lb-group="' + group + '"]')).filter(function (n) {
            return !n.closest('[hidden]');
        });
        opener = trigger;
        root.classList.add('open');
        document.body.classList.add('lb-lock');
        show(Math.max(0, items.indexOf(trigger)));
        closeBtn.focus();
    }

    function close() {
        root.classList.remove('open');
        document.body.classList.remove('lb-lock');
        if (opener && opener.focus) opener.focus({ preventScroll: true });
    }

    document.addEventListener('click', function (e) {
        var t = e.target.closest && e.target.closest('[data-lb]');
        if (!t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        open(t);
    });
})();
