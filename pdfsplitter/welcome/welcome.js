/**
 * Welcome page behaviour. Two jobs only: fill localized strings when they exist,
 * and fire confetti when the party button is pressed.
 *
 * The page must also work when it is served from a plain host, where `chrome.*`
 * does not exist (welcome-canon rule 2). Every chrome access below is guarded,
 * and the HTML already contains the English text - i18n only overrides it.
 */
(function () {
  'use strict';

  function applyDocumentLocale() {
    var dir = 'ltr';
    var lang = 'en';
    try {
      if (typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage) {
        dir = chrome.i18n.getMessage('@@bidi_dir') || 'ltr';
        lang = chrome.i18n.getMessage('@@ui_locale') || 'en';
      }
    } catch (e) {
      dir = 'ltr';
      lang = 'en';
    }
    document.documentElement.dir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang || 'en';
  }

  function localize() {
    var api = typeof chrome !== 'undefined' && chrome.i18n && chrome.i18n.getMessage;
    if (!api) return;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var value = '';
      try {
        value = chrome.i18n.getMessage(key);
      } catch (e) {
        value = '';
      }
      if (value) nodes[i].textContent = value;
    }
    var title = '';
    try {
      title = chrome.i18n.getMessage('welcomeTitle');
    } catch (e) {
      title = '';
    }
    if (title) document.title = title;
  }

  /* Confetti is the one place this product is allowed to be loud: the page is
     seen once. It is drawn on a canvas that is removed when it finishes, so
     nothing keeps running behind the page. */
  function confetti() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    /* The mark's own palette - read from the page's custom properties so "keep in sync with
       tokens.css" is a fact, not a comment. The fallbacks are the values welcome.css declares:
       --primary #1f1a17 (the accent, Р-71), --mark-red #d0331b and --mark-ivory #f3e9d2 (the
       Lissitzky wedge). */
    var css = window.getComputedStyle(document.documentElement);
    function token(name, fallback) {
      var value = (css.getPropertyValue(name) || '').trim();
      return value || fallback;
    }
    var colors = [
      token('--primary', '#1f1a17'),
      token('--mark-red', '#d0331b'),
      token('--mark-ivory', '#f3e9d2'),
    ];
    var pieces = [];
    for (var i = 0; i < 120; i++) {
      pieces.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 240,
        y: window.innerHeight * 0.32,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -11 - 4,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
      });
    }

    var started = performance.now();
    function frame(now) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        p.vy += 0.28;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (now - started < 2600) {
        requestAnimationFrame(frame);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  applyDocumentLocale();
  localize();
  var party = document.getElementById('party');
  if (party) party.addEventListener('click', confetti);
})();
