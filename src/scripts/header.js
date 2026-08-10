export function initHeader() {
  const header = document.querySelector('header');
  const firstSection = document.querySelector('section:first-of-type');

  if (!header || !firstSection) return;

  const menuToggle = header.querySelector('.menu-toggle');
  const primaryNavigation = header.querySelector('#primary-navigation');
  const mobileNavigation = window.matchMedia('(max-width: 768px)');

  if (!menuToggle || !primaryNavigation) return;

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
}
