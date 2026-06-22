/* ═══════════════════════════════════════════
   ELEMENT.ink — Script
   ═══════════════════════════════════════════ */

'use strict';

/* ── Car data ─────────────────────────────── */
const CAR_DATA = {
  'Lada':          ['Granta', 'Vesta', 'Largus', 'Niva', 'Niva Travel', 'XRAY', 'Priora', 'Kalina', '2107', '2114'],
  'Toyota':        ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Land Cruiser Prado', 'Highlander', 'C-HR', 'Yaris', 'Auris'],
  'Volkswagen':    ['Golf', 'Passat', 'Tiguan', 'Polo', 'Jetta', 'Touareg', 'Touran', 'Amarok', 'Caddy', 'T-Roc'],
  'Kia':           ['Rio', 'Sportage', 'Ceed', 'Sorento', 'Seltos', 'Stinger', 'Cerato', 'Soul', 'Carnival'],
  'Hyundai':       ['Solaris', 'Tucson', 'Creta', 'ix35', 'Santa Fe', 'Sonata', 'Elantra', 'Palisade', 'Accent'],
  'Nissan':        ['Qashqai', 'X-Trail', 'Juke', 'Almera', 'Terrano', 'Navara', 'Murano', 'Pathfinder', 'Note'],
  'Ford':          ['Focus', 'Fiesta', 'Kuga', 'Explorer', 'EcoSport', 'Mondeo', 'Edge', 'Fusion'],
  'Renault':       ['Logan', 'Sandero', 'Duster', 'Megane', 'Kaptur', 'Arkana', 'Fluence', 'Scenic'],
  'Skoda':         ['Octavia', 'Rapid', 'Superb', 'Fabia', 'Kodiaq', 'Karoq', 'Kamiq', 'Scala'],
  'BMW':           ['1 серия', '3 серия', '5 серия', '7 серия', 'X1', 'X3', 'X5', 'X6', 'X7', 'M3', 'M5'],
  'Mercedes-Benz': ['A-класс', 'C-класс', 'E-класс', 'S-класс', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'CLA'],
  'Audi':          ['A1', 'A3', 'A4', 'A6', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT'],
  'Mazda':         ['Mazda 3', 'Mazda 6', 'CX-3', 'CX-5', 'CX-9', 'CX-30', 'MX-5'],
  'Honda':         ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot', 'Jazz', 'ZR-V', 'Fit'],
  'Mitsubishi':    ['Outlander', 'Lancer', 'Pajero', 'Pajero Sport', 'Eclipse Cross', 'ASX', 'L200'],
  'Subaru':        ['Forester', 'Outback', 'Impreza', 'XV', 'Legacy', 'BRZ', 'Crosstrek'],
  'Lexus':         ['IS', 'ES', 'GS', 'LS', 'NX', 'RX', 'GX', 'LX', 'UX', 'LC'],
  'Infiniti':      ['Q50', 'Q60', 'QX50', 'QX60', 'QX80', 'FX35', 'FX37'],
  'Chery':         ['Tiggo 4', 'Tiggo 7', 'Tiggo 8', 'Arrizo 5', 'Arrizo 8'],
  'Geely':         ['Atlas', 'Coolray', 'Monjaro', 'Tugella', 'Emgrand'],
  'Haval':         ['Jolion', 'F7', 'F7x', 'H9', 'Dargo'],
  'Другое':        [],
};

/* ── DOM refs ─────────────────────────────── */
const $ = id => document.getElementById(id);

const header       = $('header') || document.querySelector('.header');
const burger       = $('burger');
const mobileMenu   = $('mobileMenu');
const carMakeSel   = $('carMake');
const carModelSel  = $('carModel');
const carMakeCust  = $('carMakeCustom');
const carModelCust = $('carModelCustom');
const bookingForm  = $('bookingForm');
const formSuccess  = $('formSuccess');
const phoneInput   = $('fphone');

/* ── Populate makes ───────────────────────── */
function initMakes() {
  Object.keys(CAR_DATA).forEach(make => {
    carMakeSel.appendChild(new Option(make, make));
  });
}

/* ── Make → populate models ───────────────── */
carMakeSel.addEventListener('change', function () {
  const make = this.value;

  // reset model
  carModelSel.innerHTML = '';
  carModelSel.disabled = true;
  carMakeCust.style.display  = 'none';
  carModelCust.style.display = 'none';
  carMakeCust.value  = '';
  carModelCust.value = '';
  carMakeSel.classList.remove('err');
  carModelSel.classList.remove('err');

  if (!make) {
    carModelSel.appendChild(new Option('— Сначала выберите марку —', ''));
    return;
  }

  if (make === 'Другое') {
    carMakeCust.style.display  = 'block';
    carModelCust.style.display = 'block';
    carModelSel.appendChild(new Option('— Введите модель вручную —', ''));
    return;
  }

  carModelSel.appendChild(new Option('— Выберите модель —', ''));
  CAR_DATA[make].forEach(m => carModelSel.appendChild(new Option(m, m)));
  carModelSel.appendChild(new Option('Другая модель (ввести вручную)', 'other'));
  carModelSel.disabled = false;
});

/* ── Model → show custom input ────────────── */
carModelSel.addEventListener('change', function () {
  carModelCust.style.display = this.value === 'other' ? 'block' : 'none';
  if (this.value !== 'other') carModelCust.value = '';
  carModelSel.classList.remove('err');
});

/* ── Phone mask ───────────────────────────── */
phoneInput.addEventListener('input', function () {
  let d = this.value.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7') && d.length > 0) d = '7' + d;
  d = d.substring(0, 11);
  let f = '';
  if (d.length > 0)  f  = '+7';
  if (d.length > 1)  f += ' (' + d.substring(1, 4);
  if (d.length >= 4) f += ') ' + d.substring(4, 7);
  if (d.length >= 7) f += '-' + d.substring(7, 9);
  if (d.length >= 9) f += '-' + d.substring(9, 11);
  this.value = f;
});

/* ── Form validation ──────────────────────── */
function getField(id) { return document.getElementById(id); }

function markField(el, valid) {
  el.classList.toggle('err', !valid);
}

function validateAndSubmit(e) {
  e.preventDefault();

  const fname   = getField('fname');
  const fphone  = getField('fphone');
  const fcomment = getField('fcomment');
  const isOtherMake  = carMakeSel.value === 'Другое';
  const isOtherModel = carModelSel.value === 'other';

  const nameOk    = fname.value.trim().length >= 2;
  const phoneOk   = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(fphone.value.trim());
  const makeOk    = isOtherMake
    ? carMakeCust.value.trim().length > 0
    : carMakeSel.value !== '';
  const modelOk   = isOtherMake
    ? carModelCust.value.trim().length > 0
    : (isOtherModel
      ? carModelCust.value.trim().length > 0
      : carModelSel.value !== '' && carModelSel.value !== 'other');
  const commentOk = fcomment.value.trim().length >= 5;

  markField(fname,    nameOk);
  markField(fphone,   phoneOk);
  markField(fcomment, commentOk);

  if (isOtherMake) {
    markField(carMakeCust,  makeOk);
    markField(carModelCust, modelOk);
  } else {
    markField(carMakeSel, makeOk);
    if (isOtherModel) {
      markField(carModelCust, modelOk);
    } else {
      markField(carModelSel, modelOk);
    }
  }

  if (!nameOk || !phoneOk || !makeOk || !modelOk || !commentOk) {
    const firstErr = bookingForm.querySelector('.err');
    if (firstErr) firstErr.focus();
    return;
  }

  // Success
  bookingForm.style.display   = 'none';
  formSuccess.style.display   = 'block';
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

bookingForm.addEventListener('submit', validateAndSubmit);

// Remove error on input
bookingForm.addEventListener('input', e => {
  if (e.target.classList.contains('err')) e.target.classList.remove('err');
}, true);

/* ── Burger / mobile menu ─────────────────── */
burger.addEventListener('click', function () {
  const open = mobileMenu.classList.toggle('open');
  this.classList.toggle('open', open);
  this.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mobile-nav-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

/* ── Sticky header ────────────────────────── */
window.addEventListener('scroll', () => {
  document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── Active nav link ──────────────────────── */
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.3, rootMargin: '-68px 0px 0px 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── Scroll reveal ────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initMakes);
