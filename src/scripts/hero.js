export function initHero() {
  const dynamicText = document.querySelector('.dynamic-text');
  const years = document.querySelector('.bottom-skills span:nth-child(1)');

  if (!dynamicText || !years) return;

  const words = [
    'Front-End Developer',
    'React / Next.js Developer',
    'Problem Solver',
    'UI/UX Integration',
  ];
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
}
