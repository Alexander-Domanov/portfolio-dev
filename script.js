const header = document.querySelector('header');
const firstSection = document.querySelector('section:first-of-type');
const menuToggle = header.querySelector('.menu-toggle');
const primaryNavigation = header.querySelector('#primary-navigation');
const mobileNavigation = window.matchMedia('(max-width: 768px)');

function setMenuState(isOpen) {
  header.classList.toggle('is-menu-open', isOpen);
  primaryNavigation.inert = mobileNavigation.matches && !isOpen;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

function closeMenu(restoreFocus = false) {
  setMenuState(false);

  if (restoreFocus) {
    menuToggle.focus();
  }
}

header.classList.add('header--enhanced');
setMenuState(false);

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setMenuState(!isOpen);
});

primaryNavigation.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a')) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

mobileNavigation.addEventListener('change', () => {
  closeMenu();
});

let lastScroll = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  const crossedTop = current >= firstSection.offsetTop && lastScroll < firstSection.offsetTop;
  const crossedBack = current < firstSection.offsetTop && lastScroll >= firstSection.offsetTop;

  if ((crossedTop || crossedBack) && !ticking) {
    ticking = true;
    header.classList.add('scroll-blink');

    setTimeout(() => {
      header.classList.remove('scroll-blink');
      ticking = false;
    }, 350);
  }

  lastScroll = current;
});

const words = [
  'Front-End Developer',
  'React / Next.js Developer',
  'Problem Solver',
  'UI/UX Integration',
];

const dynamicText = document.querySelector('.dynamic-text');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const defaultRole = 'Frontend Developer';
let index = 0;
let roleTimeoutId = null;
let roleIntervalId = null;

function changeWord() {
  window.clearTimeout(roleTimeoutId);
  dynamicText.style.opacity = 0;
  dynamicText.style.transform = 'translateY(-10px)';

  roleTimeoutId = window.setTimeout(() => {
    dynamicText.textContent = words[index];
    dynamicText.style.opacity = 1;
    dynamicText.style.transform = 'translateY(0)';

    index += 1;
    if (index >= words.length) index = 0;
    roleTimeoutId = null;
  }, 300);
}

function stopRoleRotation() {
  window.clearTimeout(roleTimeoutId);
  window.clearInterval(roleIntervalId);
  roleTimeoutId = null;
  roleIntervalId = null;
}

function showDefaultRole() {
  stopRoleRotation();
  index = 0;
  dynamicText.textContent = defaultRole;
  dynamicText.style.removeProperty('opacity');
  dynamicText.style.removeProperty('transform');
}

function startRoleRotation() {
  stopRoleRotation();
  index = 0;
  changeWord();
  roleIntervalId = window.setInterval(changeWord, 3000);
}

const years = document.querySelector('.bottom-skills span:nth-child(1)');
let y = 0;
const target = 2;
let yearsIntervalId = null;

function stopYearsCounter() {
  window.clearInterval(yearsIntervalId);
  yearsIntervalId = null;
  y = target;
  years.textContent = `${target}+ Years`;
}

function startYearsCounter() {
  if (yearsIntervalId !== null || y >= target) return;

  yearsIntervalId = window.setInterval(() => {
    y += 1;
    years.textContent = `${y}+ Years`;

    if (y >= target) {
      window.clearInterval(yearsIntervalId);
      yearsIntervalId = null;
    }
  }, 200);
}

function updateMotionPreference() {
  if (reducedMotion.matches) {
    showDefaultRole();
    stopYearsCounter();
    return;
  }

  startRoleRotation();
  startYearsCounter();
}

reducedMotion.addEventListener('change', updateMotionPreference);
updateMotionPreference();
