let initialized = false;

export function initAbout() {
  if (initialized) return;

  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;

  const aboutItems = Array.from(aboutSection.querySelectorAll('[data-animate]'));
  if (aboutItems.length === 0) return;

  initialized = true;

  const aboutReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsAboutReveal = 'IntersectionObserver' in window;
  const aboutHover = window.matchMedia('(hover: hover)');
  const aboutFinePointer = window.matchMedia('(pointer: fine)');
  let aboutObserver = null;
  let aboutRevealComplete = false;
  let aboutSpotlightCleanups = [];

  function stopAboutObserver() {
    if (aboutObserver) {
      aboutObserver.disconnect();
      aboutObserver = null;
    }
  }

  function stopAboutSpotlight() {
    aboutSpotlightCleanups.forEach(cleanup => cleanup());
    aboutSpotlightCleanups = [];

    aboutItems.forEach(el => {
      el.style.removeProperty('--x');
      el.style.removeProperty('--y');
    });
  }

  function startAboutSpotlight() {
    stopAboutSpotlight();

    if (
      aboutReducedMotion.matches ||
      !supportsAboutReveal ||
      !aboutHover.matches ||
      !aboutFinePointer.matches
    ) {
      return;
    }

    aboutItems.forEach(el => {
      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--y', `${e.clientY - rect.top}px`);
      };
      const handleMouseLeave = () => {
        el.style.setProperty('--x', '50%');
        el.style.setProperty('--y', '50%');
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      aboutSpotlightCleanups.push(() => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    });
  }

  function showAllAboutItems() {
    stopAboutObserver();
    aboutSection.classList.remove('about--enhanced');
    aboutItems.forEach(el => el.classList.add('animate'));
    aboutRevealComplete = true;
  }

  function startAboutReveal() {
    if (aboutRevealComplete || !supportsAboutReveal) return;

    stopAboutObserver();
    aboutSection.classList.add('about--enhanced');
    aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('animate');
        aboutObserver.unobserve(entry.target);
      });

      if (aboutItems.every(el => el.classList.contains('animate'))) {
        stopAboutObserver();
        aboutRevealComplete = true;
      }
    }, {
      threshold: 0.25,
    });

    aboutItems.forEach(el => aboutObserver.observe(el));
  }

  function updateAboutSpotlight() {
    startAboutSpotlight();
  }

  function updateAboutMotionPreference() {
    if (aboutReducedMotion.matches || !supportsAboutReveal) {
      showAllAboutItems();
      updateAboutSpotlight();
      return;
    }

    startAboutReveal();
    updateAboutSpotlight();
  }

  aboutReducedMotion.addEventListener('change', updateAboutMotionPreference);
  aboutHover.addEventListener('change', updateAboutSpotlight);
  aboutFinePointer.addEventListener('change', updateAboutSpotlight);
  updateAboutMotionPreference();
}
