// Back pill: return to the braunf.com page the visitor came from (for example the orb),
// remembered for the whole visit; visitors from anywhere else get a link to braunf.com.
(function () {
    var pill = document.querySelector('[data-back]');
    if (!pill) return;
    var key = 'braunf-back', stored = null;
    try { stored = sessionStorage.getItem(key); } catch (e) {}
    var ref = document.referrer, host = '';
    try { host = new URL(ref).hostname; } catch (e) {}
    if (ref && host !== location.hostname && /(^|\.)braunf\.com$/.test(host)) {
        stored = ref;
        try { sessionStorage.setItem(key, ref); } catch (e) {}
    }
    if (stored) { pill.href = stored; pill.textContent = '\u2190 Back'; }
})();
