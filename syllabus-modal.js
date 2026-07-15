/* =====================================================
   Sarvatah — syllabus-modal.js
   Lead capture before syllabus / brochure download
   ===================================================== */
(function () {
  'use strict';

  /* ── Inject styles ── */
  var css = [
    '#sv-modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.60);z-index:99998;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}',
    '#sv-modal-overlay.open{display:flex}',
    '#sv-modal-box{background:#fff;border-radius:24px;padding:40px 36px 36px;max-width:440px;width:100%;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.22);font-family:Inter,sans-serif;animation:sv-pop .25s cubic-bezier(.34,1.56,.64,1)}',
    '@keyframes sv-pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}',
    '#sv-modal-close{position:absolute;top:14px;right:18px;background:none;border:none;font-size:22px;color:#9CA3AF;cursor:pointer;line-height:1;padding:4px}',
    '#sv-modal-close:hover{color:#374151}',
    '.sv-label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:6px}',
    '.sv-input{width:100%;padding:11px 14px;border:1.5px solid #E5E7EB;border-radius:10px;font-size:14px;font-family:Inter,sans-serif;outline:none;transition:border-color .15s;color:#121C28}',
    '.sv-input:focus{border-color:#004AC6}',
    '.sv-group{margin-bottom:16px}',
    '.sv-btn{width:100%;background:#004AC6;color:#fff;padding:13px;border-radius:10px;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .15s;margin-top:4px}',
    '.sv-btn:hover{opacity:.88}',
    '.sv-btn:disabled{opacity:.6;cursor:not-allowed}',
    '.sv-error{color:#DC2626;font-size:12px;margin-top:6px;display:none}',
    '@media(max-width:480px){#sv-modal-box{padding:28px 20px 24px}}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Build modal HTML ── */
  var html = [
    '<div id="sv-modal-overlay">',
    '  <div id="sv-modal-box">',
    '    <button id="sv-modal-close" aria-label="Close">&times;</button>',
    '    <div style="width:48px;height:48px;background:#E8F0FE;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px">',
    '      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004AC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    '    </div>',
    '    <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;color:#004AC6;text-transform:uppercase;margin-bottom:6px">Free Download</div>',
    '    <h2 style="font-size:22px;font-weight:800;color:#121C28;margin-bottom:6px;line-height:1.3">Get the Full Syllabus</h2>',
    '    <p style="color:#6B7280;font-size:14px;line-height:21px;margin-bottom:24px">Enter your details and we\'ll send you the complete course brochure instantly.</p>',
    '    <div class="sv-group"><label class="sv-label">Full Name <span style="color:#DC2626">*</span></label><input class="sv-input" id="sv-name" type="text" placeholder="Your full name" autocomplete="name"></div>',
    '    <div class="sv-group"><label class="sv-label">Email Address <span style="color:#DC2626">*</span></label><input class="sv-input" id="sv-email" type="email" placeholder="you@example.com" autocomplete="email"></div>',
    '    <div class="sv-group"><label class="sv-label">Phone Number <span style="color:#DC2626">*</span></label><input class="sv-input" id="sv-phone" type="tel" placeholder="+91 00000 00000" autocomplete="tel"><div class="sv-error" id="sv-err">Please fill all required fields correctly.</div></div>',
    '    <button class="sv-btn" id="sv-submit-btn">',
    '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    '      Download Syllabus',
    '    </button>',
    '    <p style="text-align:center;font-size:12px;color:#9CA3AF;margin-top:14px">🔒 We respect your privacy. No spam, ever.</p>',
    '  </div>',
    '</div>'
  ].join('');

  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  var overlay   = document.getElementById('sv-modal-overlay');
  var closeBtn  = document.getElementById('sv-modal-close');
  var submitBtn = document.getElementById('sv-submit-btn');
  var errEl     = document.getElementById('sv-err');
  var currentPdf = '';
  var currentCourse = '';

  /* ── Open / close ── */
  window.openSyllabusModal = function (pdfPath, courseName) {
    currentPdf    = pdfPath    || '';
    currentCourse = courseName || '';
    errEl.style.display = 'none';
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Syllabus';
    overlay.classList.add('open');
    setTimeout(function () { document.getElementById('sv-name').focus(); }, 120);
  };

  function closeModal() {
    overlay.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── Submit ── */
  submitBtn.addEventListener('click', async function () {
    var name  = document.getElementById('sv-name').value.trim();
    var email = document.getElementById('sv-email').value.trim();
    var phone = document.getElementById('sv-phone').value.trim();

    if (!name || !email || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Downloading...';

    /* Save lead to backend — fire-and-forget, never blocks/depends on DB or server */
    try {
      var apiBase = (typeof API_BASE !== 'undefined') ? API_BASE : '';
      fetch(apiBase + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email: email,
          phone: phone,
          interestedCourse: currentCourse,
          message: 'Requested syllabus download'
        })
      }).catch(function () { /* ignore — lead capture is best-effort only */ });
    } catch (_) { /* ignore — no backend/DB required for the download itself */ }

    /* Open/download the PDF immediately — direct link click, no fetch/blob round-trip,
       so it works instantly even with no backend or database at all. */
    var link = document.createElement('a');
    link.href = currentPdf;
    link.download = currentPdf.split('/').pop() || 'syllabus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    /* Close modal after short delay */
    setTimeout(function () {
      closeModal();
      /* Reset fields */
      document.getElementById('sv-name').value  = '';
      document.getElementById('sv-email').value = '';
      document.getElementById('sv-phone').value = '';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Syllabus';
    }, 800);
  });

})();
