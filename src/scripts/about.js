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
  let aboutObserver = null;
  let aboutRevealComplete = false;

  function stopAboutObserver() {
    if (aboutObserver) {
      aboutObserver.disconnect();
      aboutObserver = null;
    }
  }

  function showAllAboutItems() {
    stopAboutObserver();
    aboutSection.classList.remove('about--enhanced');
    aboutItems.forEach((el) => el.classList.add('animate'));
    aboutRevealComplete = true;
  }

  function startAboutReveal() {
    if (aboutRevealComplete || !supportsAboutReveal) return;

    stopAboutObserver();
    aboutSection.classList.add('about--enhanced');
    aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('animate');
          aboutObserver.unobserve(entry.target);
        });

        if (aboutItems.every((el) => el.classList.contains('animate'))) {
          stopAboutObserver();
          aboutRevealComplete = true;
        }
      },
      {
        threshold: 0.25,
      }
    );

    aboutItems.forEach((el) => aboutObserver.observe(el));
  }

  function updateAboutMotionPreference() {
    if (aboutReducedMotion.matches || !supportsAboutReveal) {
      showAllAboutItems();
      return;
    }

    startAboutReveal();
  }

  aboutReducedMotion.addEventListener('change', updateAboutMotionPreference);
  updateAboutMotionPreference();
}
