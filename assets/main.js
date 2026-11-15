// ── 설정 ─────────────────────────────────────────────
// Tally 신청 폼 주소를 만든 뒤 아래 따옴표 안에 넣으세요. 예: 'https://tally.so/r/abcd12'
// 비워두면 "가입 심사 요청" 버튼은 페이지 안의 신청 섹션으로만 이동합니다.
var FORM_URL = 'https://tally.so/r/o9eqXe';
var OPENING = new Date(2026, 11, 28); // 2026-12-28
// ────────────────────────────────────────────────────

(function () {
  // 신청 버튼 연결
  if (FORM_URL) {
    document.querySelectorAll('.js-apply').forEach(function (a) {
      a.setAttribute('href', FORM_URL);
      a.setAttribute('rel', 'noopener');
    });
  }

  // D-day
  var ddayEl = document.getElementById('dday');
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function updateDday() {
    if (!ddayEl) return;
    var t = new Date();
    var today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    var d = Math.round((OPENING - today) / 86400000);
    ddayEl.textContent = d > 0 ? 'D-' + d : (d === 0 ? 'D-DAY' : 'NOW OPEN');
  }
  updateDday();

  // 확인 시각 (실시간)
  var nowEl = document.getElementById('nowText');
  function fmt(d) {
    return d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  setInterval(function () {
    if (nowEl) nowEl.textContent = fmt(new Date());
    updateDday();
  }, 1000);
  if (nowEl) nowEl.textContent = fmt(new Date());

  // 인증서 확인 연출
  var phases = {};
  document.querySelectorAll('.demo [data-phase]').forEach(function (el) { phases[el.getAttribute('data-phase')] = el; });
  var checks = document.querySelectorAll('.demo .check');
  var scanView = document.getElementById('scanView');
  var mergeView = document.getElementById('mergeView');
  var statusText = document.getElementById('statusText');
  var timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function show(name) {
    Object.keys(phases).forEach(function (k) { phases[k].hidden = (k !== name); });
  }
  function setStep(n) {
    checks.forEach(function (c) { c.classList.toggle('on', Number(c.getAttribute('data-step')) <= n); });
  }
  function restartAnim(el) { // 숨김 해제 시 애니메이션 다시 재생
    if (!el) return;
    var parent = el.parentNode, next = el.nextSibling;
    parent.removeChild(el); parent.insertBefore(el, next);
  }
  function verify() {
    clearTimers();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setStep(3); show('done'); return; }
    setStep(0);
    scanView.hidden = false; mergeView.hidden = true;
    statusText.textContent = 'Venn에서 확인하는 중…';
    show('progress');
    restartAnim(scanView);
    later(800, function () { setStep(1); });
    later(1150, function () { setStep(2); });
    later(1500, function () { setStep(3); });
    later(1900, function () {
      scanView.hidden = true; mergeView.hidden = false; restartAnim(mergeView);
      statusText.textContent = '확인되었습니다';
    });
    later(2700, function () { show('done'); });
  }
  var byId = function (id) { return document.getElementById(id); };
  if (byId('verifyBtn')) byId('verifyBtn').addEventListener('click', verify);
  if (byId('fakeBtn')) byId('fakeBtn').addEventListener('click', function () { clearTimers(); show('fake'); });
  if (byId('realBtn')) byId('realBtn').addEventListener('click', function () { show('done'); });
  if (byId('resetBtn')) byId('resetBtn').addEventListener('click', function () { clearTimers(); setStep(0); show('idle'); });
})();
