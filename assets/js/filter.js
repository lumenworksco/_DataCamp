// Filtering for the "all credentials" page: search, type, year, skill, month and sort.
// The whole list is plain HTML, so the page works without this script; this only narrows it.
(function () {
    var grid = document.getElementById('results');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.ac'));
    var total = cards.length;
    var q = document.getElementById('q');
    var countEl = document.getElementById('count');
    var empty = document.getElementById('empty');
    var resetBtns = [document.getElementById('reset'), document.getElementById('reset2')];
    var bars = Array.prototype.slice.call(document.querySelectorAll('.bar[data-month]'));

    var state = { type: 'all', year: 'all', skill: 'all', month: 'all', sort: 'new', q: '' };

    function readUrl() {
        var p = new URLSearchParams(location.search);
        Object.keys(state).forEach(function (k) { if (p.get(k)) state[k] = p.get(k); });
        q.value = state.q;
    }

    function writeUrl() {
        var p = new URLSearchParams();
        var defaults = { type: 'all', year: 'all', skill: 'all', month: 'all', sort: 'new', q: '' };
        Object.keys(state).forEach(function (k) { if (state[k] !== defaults[k]) p.set(k, state[k]); });
        var qs = p.toString();
        try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '')); } catch (e) { /* file:// */ }
    }

    function matches(card) {
        var d = card.dataset;
        if (state.type !== 'all' && d.type !== state.type) return false;
        if (state.year !== 'all' && d.year !== state.year) return false;
        if (state.month !== 'all' && d.month !== state.month) return false;
        if (state.skill !== 'all' && d.skills.split('|').indexOf(state.skill) === -1) return false;
        if (state.q) {
            var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
            for (var i = 0; i < words.length; i++) if (d.search.indexOf(words[i]) === -1) return false;
        }
        return true;
    }

    function sorted() {
        var by = {
            new: function (a, b) { return a.dataset.date < b.dataset.date ? 1 : -1; },
            old: function (a, b) { return a.dataset.date > b.dataset.date ? 1 : -1; },
            long: function (a, b) { return (+b.dataset.hours - +a.dataset.hours) || (a.dataset.date < b.dataset.date ? 1 : -1); }
        };
        return cards.slice().sort(by[state.sort] || by.new);
    }

    function render() {
        var shown = 0;
        sorted().forEach(function (c) {
            grid.appendChild(c);
            var ok = matches(c);
            c.hidden = !ok;
            if (ok) shown++;
        });
        countEl.textContent = 'Showing ' + shown + ' of ' + total;
        empty.hidden = shown !== 0;
        var active = state.type !== 'all' || state.year !== 'all' || state.skill !== 'all' || state.month !== 'all' || state.q !== '';
        resetBtns[0].hidden = !active;

        document.querySelectorAll('.chipset').forEach(function (set) {
            var g = set.getAttribute('data-group');
            set.querySelectorAll('.chip').forEach(function (b) {
                var on = b.getAttribute('data-v') === state[g];
                b.classList.toggle('on', on);
                b.setAttribute('aria-pressed', String(on));
            });
        });
        bars.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-month') === state.month)); });
        writeUrl();
    }

    document.querySelectorAll('.chipset').forEach(function (set) {
        set.addEventListener('click', function (e) {
            var b = e.target.closest('.chip');
            if (!b) return;
            state[set.getAttribute('data-group')] = b.getAttribute('data-v');
            render();
        });
    });

    bars.forEach(function (b) {
        b.addEventListener('click', function () {
            var m = b.getAttribute('data-month');
            state.month = state.month === m ? 'all' : m;
            render();
        });
    });

    var t;
    q.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () { state.q = q.value.trim(); render(); }, 120);
    });

    function reset() {
        state = { type: 'all', year: 'all', skill: 'all', month: 'all', sort: state.sort, q: '' };
        q.value = '';
        render();
    }
    resetBtns.forEach(function (b) { if (b) b.addEventListener('click', reset); });

    // "/" jumps to the search box, like on most sites
    document.addEventListener('keydown', function (e) {
        if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
        var tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        q.focus();
        q.select();
    });

    readUrl();
    render();
})();
