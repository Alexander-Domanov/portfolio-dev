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

const words = [
  "Front-End Developer",
  "React / Next.js Developer",
  "Problem Solver",
  "UI/UX Integration"
];

const dynamicText = document.querySelector(".dynamic-text");
let index = 0;

function changeWord() {
  dynamicText.style.opacity = 0;
  dynamicText.style.transform = "translateY(-10px)";

  setTimeout(() => {
    dynamicText.textContent = words[index];
    dynamicText.style.opacity = 1;
    dynamicText.style.transform = "translateY(0)";

    index++;
    if (index >= words.length) index = 0;
  }, 300);
}
changeWord();

setInterval(changeWord, 3000);

const years = document.querySelector(".bottom-skills span:nth-child(1)");
let y = 0;
const target = 2;
const interval = setInterval(() => {
  if (y < target) {
    y++;
    years.textContent = y + "+ Years";
  } else {
    clearInterval(interval);
  }
}, 200);
