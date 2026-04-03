const header = document.querySelector('header');
const firstSection = document.querySelector('section:first-of-type');

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
