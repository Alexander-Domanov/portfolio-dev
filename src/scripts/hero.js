export function initHero() {
  const dynamicText = document.querySelector('.dynamic-text');
  if (!dynamicText) return;

  const words = ['Frontend Developer', 'React / Next.js Developer', 'TypeScript Developer'];
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

  function updateMotionPreference() {
    if (reducedMotion.matches) {
      showDefaultRole();
      return;
    }

    startRoleRotation();
  }

  reducedMotion.addEventListener('change', updateMotionPreference);
  updateMotionPreference();
}
