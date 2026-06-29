// ── Always start at top on refresh ─────────────────────
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ── Smooth scroll ───────────────────────────────────────
function smoothScrollTo(target, duration = 820) {
  const start = window.scrollY;
  const end   = target.getBoundingClientRect().top + start - document.getElementById('header').offsetHeight - 12;
  const diff  = end - start;
  let startTime = null;

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    if (!startTime) startTime = now;
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + diff * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  smoothScrollTo(el);
});

// ── Sticky header ───────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile nav ──────────────────────────────────────────
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ── Fade-in on scroll ───────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ── Service modal data ──────────────────────────────────
const SERVICES = {
  svc1: {
    title: 'Karosserie & Lack',
    img: 'images/karosserie.jpg',
    imgAlt: 'Karosserie und Werkzeug',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    desc: 'Als besonders qualifizierter Karosserie-Fachbetrieb führen wir alle Arbeiten rund um Karosserie und Lackierung durch – von der kleinen Delle bis zur hochwertigen Neulackierung in Originalfarbe.',
    list: [
      'Dellen- und Blechschadenreparatur',
      'Fahrzeuglackierungen (Teil- und Vollackierung)',
      'Smart Repair – Kleinschäden schnell behoben',
      'Beilackierungen und präzise Farbtonabstimmung',
      'Rost- und Korrosionsschutzbehandlung',
      'Alle Marken und Fahrzeugtypen'
    ]
  },
  svc2: {
    title: 'Unfallinstandsetzung',
    img: 'images/werkzeug.jpg',
    imgAlt: 'Unfallschaden am Fahrzeug',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    desc: 'Nach einem Unfall kümmern wir uns um alles – von der Schadensaufnahme über die Koordination mit Gutachtern bis zur vollständigen Instandsetzung Ihres Fahrzeugs. Wir arbeiten direkt mit allen Versicherungen zusammen.',
    list: [
      'Abwicklung mit Haftpflicht, Teilkasko und Vollkasko',
      'Koordination mit Kfz-Sachverständigen und Gutachtern',
      'Mietwagenvermittlung während der Reparatur',
      'Karosserie- und Lackarbeiten nach Unfall',
      'Rahmen- und Richtarbeiten',
      'Lückenlose Dokumentation für Versicherungen'
    ]
  },
  svc3: {
    title: 'Autoglas & Steinschlag',
    img: 'images/steinschlag.jpg',
    imgAlt: 'Autoglas Steinschlagreparatur',
    iconSvg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    desc: 'Als offizieller AGS Autoglas Spezialist Partner bieten wir schnellen und professionellen Autoglasservice – vom Steinschlag bis zum kompletten Scheibentausch, oft direkt über Ihre Versicherung abgerechnet.',
    list: [
      'Steinschlagreparatur – meist ohne Aufpreis über Kasko',
      'Windschutzscheibentausch in Originalqualität',
      'Seiten- und Heckscheibentausch',
      'Direktabrechnung mit allen Kfz-Versicherungen',
      'Zugelassene Ersatzgläser nach OEM-Standard',
      'Schnelle Terminvergabe – oft noch am selben Tag'
    ]
  },
  svc4: {
    title: 'HU / AU mit GTÜ',
    img: 'images/Noderer-car-on-dyno-and-license-plate.gif',
    imgAlt: 'Fahrzeug auf dem Prüfstand',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    desc: 'Als GTÜ-Partnerbetrieb führen wir Hauptuntersuchung und Abgasuntersuchung direkt vor Ort durch – kein extra Weg zur Prüfstelle nötig. Festgestellte Mängel können wir oft sofort beheben.',
    list: [
      'Hauptuntersuchung (HU) nach §29 StVZO',
      'Abgasuntersuchung (AU)',
      'Gültig für Pkw, Lkw und Motorräder',
      'Prüfung und Mängelbeseitigung in einem',
      'Plakettenvergabe direkt vor Ort',
      'Flexible Terminvereinbarung Mo–Fr'
    ]
  },
  svc5: {
    title: 'Reifen & Felgen',
    img: 'images/reifen.jpg',
    imgAlt: 'Alufelge mit Reifen',
    iconSvg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>',
    desc: 'Von der saisonalen Umrüstung bis zum neuen Felgensatz – wir bieten Ihnen einen umfassenden Reifen- und Felgenservice für alle Fahrzeugtypen und Reifengrößen.',
    list: [
      'Sommer- und Winterreifenwechsel',
      'Auswuchten für ruhigen Geradeauslauf',
      'Saisonale Reifeneinlagerung',
      'Neue Bereifung in allen gängigen Größen',
      'Alufelgen und Stahlfelgen im Programm',
      'Reifenreparatur (sofern technisch möglich)'
    ]
  },
  svc6: {
    title: 'Klimaservice',
    img: 'images/climat-service-car-noderer.webp',
    imgAlt: 'Klimaservice Fahrzeug',
    iconSvg: '<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg>',
    desc: 'Eine regelmäßige Klimawartung verlängert die Lebensdauer Ihrer Anlage und sorgt für frische, saubere Luft im Fahrzeuginnenraum – besonders empfehlenswert vor der Sommersaison.',
    list: [
      'Kältemittelbefüllung (R134a und R1234yf)',
      'Dichtigkeitsprüfung der Klimaanlage',
      'UV-Kontrastmittel-Lecksuche',
      'Klimaanlagen-Desinfektion und Geruchsbeseitigung',
      'Filterinspektion und -wechsel',
      'Alle Fahrzeugtypen und Baujahre'
    ]
  }
};

// ── Modal logic ─────────────────────────────────────────
const overlay  = document.getElementById('serviceModal');
const closeBtn = document.getElementById('modalClose');
const ctaBtn   = document.getElementById('modalCta');
let lastFocused = null;

function openModal(id) {
  const data = SERVICES[id];
  if (!data) return;

  // Image
  const imgWrap = document.getElementById('modalImgWrap');
  if (data.img) {
    imgWrap.innerHTML = `<img src="${data.img}" alt="${data.imgAlt}" />`;
    imgWrap.style.display = 'block';
  } else {
    imgWrap.innerHTML = `<div class="modal-img-placeholder">${data.iconSvg}</div>`;
    imgWrap.style.display = 'block';
  }

  // Icon, title, desc
  document.getElementById('modalIcon').innerHTML = data.iconSvg;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;

  // List
  const list = document.getElementById('modalList');
  list.innerHTML = data.list.map(item => `<li>${item}</li>`).join('');

  // Open
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

// Card clicks (whole card + button)
document.querySelectorAll('.service-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.modal));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.modal); }
  });
});

// Close triggers
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

// Close modal then scroll to contact
ctaBtn.addEventListener('click', closeModal);
