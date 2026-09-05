(function () {
  /* hero sequence */
  var m = document.getElementById('mock');
  if (m && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var m1 = m.querySelector('.m1'), m2 = m.querySelector('.m2'), m3 = m.querySelector('.m3'), m4 = m.querySelector('.m4'),
        pr = m.querySelector('.printer'), rd = m.querySelector('.ready'), m7 = m.querySelector('.m7'), m8 = m.querySelector('.m8');
    var apps = [['claude','Claude','Reply to Claude…'], ['openai','ChatGPT','Message ChatGPT…']], loop = 0, timers = [];
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function setApp(i) {
      var a = apps[i % apps.length];
      document.getElementById('appName').innerHTML = '<img class="bi" src="assets/logos/' + a[0] + '.svg" alt="">' + a[1];
      document.getElementById('composer').textContent = a[2];
      document.getElementById('who1').textContent = 'Customer, in ' + a[1];
      m.querySelector('.ticket .h span:last-child').textContent = '#42 · via ' + a[1];
    }
    function reset() { [m1, m2, m3, m4, pr, m7, m8].forEach(function (el) { el.classList.remove('on'); }); m2.classList.remove('thinking'); rd.classList.remove('done'); }
    function run() {
      timers.forEach(clearTimeout); timers = [];
      m.classList.add('play'); reset(); setApp(loop++);
      at(500,   function () { m1.classList.add('on'); });
      at(1300,  function () { m2.classList.add('on', 'thinking'); });
      at(2600,  function () { m2.classList.remove('thinking'); });
      at(4200,  function () { m3.classList.add('on'); });
      at(5200,  function () { m4.classList.add('on'); });
      at(5700,  function () { pr.classList.add('on'); });
      at(8200,  function () { rd.classList.add('done'); });
      at(9000,  function () { m7.classList.add('on'); });
      at(9500,  function () { m8.classList.add('on'); });
      at(14000, run);
    }
    setTimeout(run, 2200);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { timers.forEach(clearTimeout); m.classList.remove('play'); reset(); } else run();
    });
  }

  /* how-it-works diagram: JS timeline */
  var dg = document.getElementById('diagram'), stepsEl = document.querySelector('.steps');
  if (dg) {
    var $ = function (id) { return document.getElementById(id); };
    var P = {}; ['p1','p2a','p2b','p2c','p3','p4','p5'].forEach(function (id) { P[id] = $(id); });
    var stepEls = Array.prototype.slice.call(stepsEl.querySelectorAll('.step'));
    var LOOP = 16.5;
    /* tracks: [type, id, start, dur, extra] */
    var T = [
      ['pk','k1a','p1',0.6,1.4,false], ['pk','k1b','p1',0.85,1.4,false], ['pk','k1c','p1',1.1,1.4,false],
      ['show','l_menu',2.3], ['show','l_stripe',2.7],
      ['pk','k2a','p2a',3.4,1.1,false], ['show','c1',4.6],
      ['pk','k2b','p2b',3.9,0.9,false], ['show','c2',4.9],
      ['pk','k2c','p2c',4.4,1.1,false], ['show','c3',5.6],
      ['show','l_link',5.9],
      ['pk','k3a','p3',6.8,1.0,false], ['pk','k3b','p3',7.05,1.0,false], ['show','l_read',7.7],
      ['pk','k3a','p3',8.2,1.0,true],  ['pk','k3b','p3',8.45,1.0,true],  ['show','l_quote',9.1],
      ['hide','l_page',9.9], ['show','l_order',9.9],
      ['pk','k4a','p4',10.2,1.6,false], ['pk','k4b','p4',10.45,1.6,false], ['pk','k4c','p4',10.7,1.6,false],
      ['ticket',11.8,1.2],
      ['hand',13.2,0.6], ['tap',13.9], ['show','l_tap',13.9], ['show','l_text',14.6]
    ];
    var marks = [[0.3,0],[3.2,1],[6.6,2],[10.1,3]];
    var lens = {}; Object.keys(P).forEach(function (k) { lens[k] = P[k].getTotalLength(); });
    function ease(x) { return x < 0.5 ? 2*x*x : 1 - Math.pow(-2*x+2, 2)/2; }
    function place(el, path, u, reverse) {
      var L = lens[path]; var d = (reverse ? 1-u : u) * L;
      var pt = P[path].getPointAtLength(d), pt2 = P[path].getPointAtLength(Math.min(L, Math.max(0, d + (reverse ? -1 : 1))));
      var a = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
      el.setAttribute('transform', 'translate(' + pt.x + ',' + pt.y + ') rotate(' + a + ')');
    }
    function render(t) {
      /* reset frame */
      ['k1a','k1b','k1c','k2a','k2b','k2c','k3a','k3b','k4a','k4b','k4c'].forEach(function (id) { $(id).setAttribute('opacity', '0'); });
      T.forEach(function (tr) {
        if (tr[0] === 'pk') {
          var el = $(tr[1]), s0 = tr[3], du = tr[4];
          if (t >= s0 && t < s0 + du) { el.setAttribute('opacity', '1'); place(el, tr[2], (t - s0) / du, tr[5]); }
        } else if (tr[0] === 'show') { $(tr[1]).setAttribute('opacity', t >= tr[2] ? '1' : '0'); }
        else if (tr[0] === 'hide') { $(tr[1]).setAttribute('opacity', t >= tr[2] ? '0' : '1'); }
        else if (tr[0] === 'ticket') {
          var tk = $('tkt'); if (t < tr[1]) { tk.setAttribute('opacity', '0'); tk.setAttribute('transform', 'translate(0,-118)'); }
          else { var u = Math.min(1, (t - tr[1]) / tr[2]); tk.setAttribute('opacity', '1'); tk.setAttribute('transform', 'translate(0,' + (-118 * (1 - ease(u))) + ')'); }
        } else if (tr[0] === 'hand') {
          var h = $('hand'); if (t < tr[1]) h.setAttribute('opacity', '0');
          else { var v = Math.min(1, (t - tr[1]) / tr[2]); h.setAttribute('opacity', '1'); var q = P.p5.getPointAtLength(ease(v) * lens.p5); var dip = (t > 13.9 && t < 14.15) ? 3 : 0; h.setAttribute('transform', 'translate(' + q.x + ',' + (q.y + dip) + ')'); }
        } else if (tr[0] === 'tap') { $('readyBtn').setAttribute('fill', t >= tr[1] ? '#4E7A3A' : ''); $('readyBtn').setAttribute('class', t >= tr[1] ? '' : 'sun'); }
      });
      var cur = 0; marks.forEach(function (m) { if (t >= m[0]) cur = m[1]; });
      stepEls.forEach(function (el, k) { el.classList.toggle('active', k === cur); });
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { render(LOOP - 0.1); }
    else {
      var raf, running = false, t0;
      function frame() { var t = (performance.now() - t0) / 1000; if (t >= LOOP) { t0 = performance.now(); t = 0; } render(t); raf = requestAnimationFrame(frame); }
      function start() { if (running) return; running = true; stepsEl.classList.add('live'); t0 = performance.now(); raf = requestAnimationFrame(frame); }
      function stop() { running = false; cancelAnimationFrame(raf); }
      render(0);
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.isIntersecting ? start() : stop(); }); }, { threshold: 0.25 });
      io.observe(dg);
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (dg.getBoundingClientRect().top < innerHeight) start(); });
    }
  }
  /* agent-first demo */
  var items = [
    { id: 'al-pastor', name: 'Al pastor', price: '$4.25', note: 'pork, pineapple, onion, cilantro' },
    { id: 'carnitas',  name: 'Carnitas',  price: '$4.25', note: 'pork, salsa verde' },
    { id: 'barbacoa',  name: 'Barbacoa',  price: '$4.75', note: 'beef cheek, consomé' },
    { id: 'tamales',   name: 'Tamales (2)', price: '$7.00', note: '20 made each morning' },
    { id: 'horchata',  name: 'Horchata',  price: '$3.50', note: '' }
  ];
  var out = {};
  var agentView = document.getElementById('viewAgent'), humanView = document.getElementById('viewHuman');
  var reply = document.getElementById('smsReply');
  function renderAgent() {
    var lines = ['# Taqueria Sol — pickup ordering', 'Open now · closes 21:00 · 412 Farnam St · +1 402 555 0142', 'Pickup ready in ~15 min. Pay by card or at the counter.', 'To order: open /order, or POST /order {items, pickup_time, name, phone}', '', '## Menu'];
    items.forEach(function (it) {
      var avail = out[it.id] ? '<b>SOLD OUT today</b>' : 'available';
      lines.push('- ' + it.id + ' — ' + it.name + ' — ' + it.price + ' — ' + avail + (it.note ? ' — ' + it.note : ''));
    });
    lines.push('', '## Hours', 'Mon–Thu 11:00–21:00 · Fri–Sat 11:00–22:00 · Sun 11:00–20:00');
    agentView.innerHTML = lines.join('\n');
  }
  function renderHuman() {
    Array.prototype.forEach.call(humanView.querySelectorAll('.row'), function (r) { r.classList.toggle('out', !!out[r.getAttribute('data-item')]); });
  }
  function renderReply() {
    var names = items.filter(function (i) { return out[i.id]; }).map(function (i) { return i.name.toLowerCase(); });
    reply.innerHTML = 'Reply from Counter: <em>' + (names.length ? names.join(', ') + " marked sold out. Removed from Claude, ChatGPT, Google, and your page. Text “back " + names[0].split(' ')[0] + "” to restore." : "Nothing 86'd. Full menu live everywhere.") + '</em>';
  }
  Array.prototype.forEach.call(document.querySelectorAll('#sms .chip'), function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-item'); out[id] = !out[id];
      b.setAttribute('aria-pressed', String(!!out[id]));
      b.textContent = out[id] ? id + ' \u00b7 sold out \u00b7 tap to restore' : '86 ' + id;
      renderHuman(); renderAgent(); renderReply();
    });
  });
  var vH = document.getElementById('vHuman'), vA = document.getElementById('vAgent');
  function show(agent) { humanView.hidden = agent; agentView.hidden = !agent; vH.setAttribute('aria-pressed', String(!agent)); vA.setAttribute('aria-pressed', String(agent)); }
  vH.addEventListener('click', function () { show(false); });
  vA.addEventListener('click', function () { show(true); });
  renderAgent(); renderHuman(); renderReply();

  /* signup form: in-place confirmation only. Nothing is sent anywhere yet.
     To wire a backend: point the form's action at your endpoint and delete
     this handler (or replace it with a fetch() that posts the fields). */
  var signup = document.getElementById('signup');
  if (signup) {
    signup.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = signup.querySelector('button');
      btn.textContent = 'Got it, we will text you';
      btn.disabled = true;
    });
  }
})();
