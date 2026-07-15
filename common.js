/* =====================================================
   Sarvatah — common.js  v2.0
   Visual Polish · Trust & Social Proof · Conversion
   ===================================================== */
(function () {
  'use strict';

  /* ─── 0. SHARED CSS ─────────────────────────────── */
  var sharedCSS = [
    /* Scroll reveal */
    '.s-reveal{opacity:0;transform:translateY(36px);transition:opacity .65s ease,transform .65s ease}',
    '.s-reveal.visible{opacity:1;transform:none}',
    /* Card hover lift */
    '.hover-lift{transition:transform .22s ease,box-shadow .22s ease !important}',
    '.hover-lift:hover{transform:translateY(-5px) !important;box-shadow:0 12px 36px rgba(0,74,198,.16) !important}',
    /* Back-to-top */
    '#back-to-top:hover{transform:translateY(-3px);background:#0039a6 !important}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = sharedCSS;
  document.head.appendChild(styleEl);

  /* ─── 3. ON DOM READY ───────────────────────────── */
  function init() {

    /* ── 3a. SCROLL REVEAL on all sections ── */
    var revealEls = document.querySelectorAll('section, .t-card, .blog-card');
    if ('IntersectionObserver' in window) {
      revealEls.forEach(function (el) { el.classList.add('s-reveal'); });
      var revObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function (el) { revObs.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ── 3b. CARD HOVER LIFT ── */
    document.querySelectorAll('[style*="border-radius:16px"],[style*="border-radius:12px"]').forEach(function (el) {
      if (el.tagName === 'DIV' || el.tagName === 'A') {
        el.classList.add('hover-lift');
      }
    });

    /* ── 3c. COUNTER ANIMATION ── */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
      var cntObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          cntObs.unobserve(e.target);
          var el = e.target;
          var target = parseInt(el.dataset.count, 10);
          var suffix = el.dataset.suffix || '';
          var duration = 1600;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { cntObs.observe(c); });
    }

    /* ── 3d. BACK TO TOP ── */
    var topBtn = document.createElement('button');
    topBtn.id = 'back-to-top';
    topBtn.innerHTML = '↑';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.style.cssText = 'position:fixed;bottom:100px;right:28px;z-index:9997;width:44px;height:44px;background:#004AC6;color:#fff;border:none;border-radius:50%;font-size:20px;line-height:1;cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,74,198,.4);transition:all .25s;font-family:inherit';
    topBtn.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    document.body.appendChild(topBtn);
    window.addEventListener('scroll', function () {
      topBtn.style.display = window.scrollY > 320 ? 'flex' : 'none';
    }, { passive: true });

    /* ── 3e. COOKIE CONSENT ── */
    if (!localStorage.getItem('sarvatah_cookie')) {
      var banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1e293b;color:#e2e8f0;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;gap:14px;z-index:99999;flex-wrap:wrap;box-shadow:0 -4px 24px rgba(0,0,0,.3);font-family:Inter,sans-serif;font-size:14px';
      banner.innerHTML =
        '<span>🍪 Hum cookies use karte hain — experience better banane ke liye.</span>' +
        '<div style="display:flex;gap:10px;flex-shrink:0">' +
        '<button id="cookie-accept" style="background:#004AC6;color:#fff;padding:8px 20px;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif">Accept</button>' +
        '<button id="cookie-decline" style="background:rgba(255,255,255,.1);color:#e2e8f0;padding:8px 16px;border:1px solid rgba(255,255,255,.2);border-radius:8px;font-size:13px;cursor:pointer;font-family:Inter,sans-serif">Decline</button>' +
        '</div>';
      document.body.appendChild(banner);
      document.getElementById('cookie-accept').onclick = function () { localStorage.setItem('sarvatah_cookie', '1'); banner.remove(); };
      document.getElementById('cookie-decline').onclick = function () { banner.remove(); };
    }

    /* ── 3f. LAZY LOADING ── */
    document.querySelectorAll('img:not([loading])').forEach(function (img) { img.setAttribute('loading', 'lazy'); });

    /* ── 3g. READING PROGRESS BAR (blog-article only) ── */
    if (document.getElementById('article-body')) {
      var bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#004AC6,#60a5fa);z-index:99999;width:0%;transition:width .08s linear;pointer-events:none';
      document.body.prepend(bar);
      window.addEventListener('scroll', function () {
        var el = document.documentElement;
        bar.style.width = Math.min(100, Math.max(0, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)) + '%';
      }, { passive: true });
    }

    /* ── 3h. WHATSAPP TOOLTIP ── */
    var waBtn = document.getElementById('wa-btn');
    if (waBtn) {
      var tip = document.createElement('div');
      tip.style.cssText = 'position:absolute;right:72px;top:50%;transform:translateY(-50%);background:#1e293b;color:#fff;font-size:12px;font-weight:600;white-space:nowrap;padding:7px 12px;border-radius:8px;opacity:0;transition:opacity .25s;pointer-events:none;font-family:Inter,sans-serif';
      tip.textContent = 'Chat with us! 💬';
      tip.innerHTML += '<span style="position:absolute;right:-6px;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left-color:#1e293b;border-right:none"></span>';
      waBtn.appendChild(tip);
      setTimeout(function () { tip.style.opacity = '1'; }, 2200);
      setTimeout(function () { tip.style.opacity = '0'; }, 6000);
      waBtn.onmouseenter = function () { tip.style.opacity = '1'; };
      waBtn.onmouseleave = function () { tip.style.opacity = '0'; };

      /* WA smart message for course pages */
      var slug = document.body.dataset.courseSlug;
      if (slug) {
        var cname = document.body.dataset.courseName || 'your course';
        waBtn.href = 'https://wa.me/917058234395?text=' + encodeURIComponent('Hello, I am interested in the ' + cname + ' at Sarvatah. Please share more details.');
      }
    }

    /* ── 3i. EXIT INTENT POPUP ── */
    var EXIT_KEY = 'sarvatah_exit_v1';
    if (!sessionStorage.getItem(EXIT_KEY)) {
      var exitShown = false;
      document.addEventListener('mouseleave', function (e) {
        if (e.clientY > 10 || exitShown) return;
        exitShown = true;
        sessionStorage.setItem(EXIT_KEY, '1');
        var overlay = document.createElement('div');
        overlay.id = 'exit-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.65);z-index:99997;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px)';
        overlay.innerHTML =
          '<div style="background:#fff;border-radius:24px;padding:44px 40px;max-width:460px;width:100%;text-align:center;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.25);font-family:Inter,sans-serif">' +
          '<button onclick="document.getElementById(\'exit-overlay\').remove()" style="position:absolute;top:16px;right:20px;background:none;border:none;font-size:24px;cursor:pointer;color:#9CA3AF;line-height:1">×</button>' +
          '<div style="width:56px;height:56px;background:#E8F0FE;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px">' +
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004AC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.5 2.18 2 2 0 012.48.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>' +
          '</div>' +
          '<div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#004AC6;text-transform:uppercase;margin-bottom:10px">Before You Go!</div>' +
          '<h2 style="font-size:24px;font-weight:800;color:#121C28;margin-bottom:10px;line-height:1.3">Get a FREE Career Counselling Session</h2>' +
          '<p style="color:#6B7280;font-size:14px;line-height:22px;margin-bottom:28px">Our experts will help you pick the right course and create a personalized learning path — absolutely free.</p>' +
          '<a href="contact.html" style="display:block;background:#004AC6;color:#fff;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;margin-bottom:10px">Book Free Session →</a>' +
          '<button onclick="document.getElementById(\'exit-overlay\').remove()" style="background:none;border:none;color:#9CA3AF;font-size:13px;cursor:pointer;font-family:Inter,sans-serif">No thanks, I\'ll figure it out myself</button>' +
          '</div>';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function (ev) { if (ev.target === overlay) overlay.remove(); });
      });
    }

    /* ── 3j. COURSE PAGE FEATURES ── */
    var courseSlug = document.body.dataset ? document.body.dataset.courseSlug : null;
    if (courseSlug) {

      /* Sticky bottom CTA bar */
      var courseName = document.body.dataset.courseName || 'This Course';
      var ctaBar = document.createElement('div');
      ctaBar.id = 'sticky-cta';
      ctaBar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #E5E7EB;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:14px;z-index:9996;box-shadow:0 -4px 20px rgba(0,0,0,.08);font-family:Inter,sans-serif;flex-wrap:wrap';
      ctaBar.innerHTML =
        '<div>' +
          '<div style="font-size:15px;font-weight:700;color:#121C28">' + courseName + '</div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;flex-shrink:0">' +
          '<a href="tel:+917058234395" style="background:#F3F4F6;color:#121C28;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;display:flex;align-items:center;gap:6px">📞 Call</a>' +
          '<a href="contact.html" style="background:#004AC6;color:#fff;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none">Enroll Now →</a>' +
        '</div>';
      document.body.appendChild(ctaBar);

      /* adjust WA & back-to-top above sticky bar */
      var waEl = document.getElementById('wa-btn');
      var btEl = document.getElementById('back-to-top');
      if (waEl) waEl.style.bottom = '80px';
      if (btEl) btEl.style.bottom = '148px';
    }

  } /* end init */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
