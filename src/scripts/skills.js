let initialized = false;

export function initSkills() {
  if (initialized) return;

  const skillsCards = Array.from(document.querySelectorAll('.skills__category'));
  if (skillsCards.length === 0) return;

  initialized = true;

  const skillsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const skillsHover = window.matchMedia('(hover: hover)');
  const skillsFinePointer = window.matchMedia('(pointer: fine)');
  let skillsSpotlightCleanups = [];

  function stopSkillsSpotlight() {
    skillsSpotlightCleanups.forEach(cleanup => cleanup());
    skillsSpotlightCleanups = [];

    skillsCards.forEach(card => {
      card.style.removeProperty('--x');
      card.style.removeProperty('--y');
    });
  }

  function startSkillsSpotlight() {
    stopSkillsSpotlight();

    if (skillsReducedMotion.matches || !skillsHover.matches || !skillsFinePointer.matches) {
      return;
    }

    skillsCards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
      };
      const handleMouseLeave = () => {
        card.style.removeProperty('--x');
        card.style.removeProperty('--y');
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      skillsSpotlightCleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });
  }

  function updateSkillsSpotlight() {
    startSkillsSpotlight();
  }

  skillsReducedMotion.addEventListener('change', updateSkillsSpotlight);
  skillsHover.addEventListener('change', updateSkillsSpotlight);
  skillsFinePointer.addEventListener('change', updateSkillsSpotlight);
  updateSkillsSpotlight();
}
