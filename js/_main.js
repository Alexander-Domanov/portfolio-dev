// js/main.js
// =============================================
// MAIN JAVASCRIPT FILE (2026 PREMIUM UPGRADE)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log("🚀 Main application started");

  // ====================== GLOBAL MOUSE MOVE ======================
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  });

  // ====================== CURRENT YEAR ======================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ====================== SPOTLIGHT EFFECT ======================
  function attachSpotlight(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--x', '50%');
        el.style.setProperty('--y', '50%');
      });
    });
  }

  attachSpotlight('.skills__category');
  attachSpotlight('.about__value');

  // ====================== SCROLL TO TOP ======================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====================== TEXT ROTATION ======================
  const dynamicText = document.querySelector('.dynamic-text');
  const words = [
    'Front-End Developer',
    'React / Next.js Developer',
    'UI Engineering',
    'Digital Craft'
  ];
  let index = 0;

  function changeWord() {
    if (!dynamicText) return;

    dynamicText.style.opacity = '0';
    dynamicText.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      dynamicText.textContent = words[index];
      dynamicText.style.opacity = '1';
      dynamicText.style.transform = 'translateY(0)';
      index = (index + 1) % words.length;
    }, 250);
  }

  if (dynamicText) {
    changeWord();
    setInterval(changeWord, 2800);
  }

  // ====================== YEARS COUNTER ======================
  const yearsEl = document.querySelector('.bottom-skills span:nth-child(1)');
  if (yearsEl) {
    let y = 0;
    const target = 2;

    const interval = setInterval(() => {
      if (y < target) {
        y++;
        yearsEl.textContent = `${y}+ Years`;
      } else {
        clearInterval(interval);
      }
    }, 200);
  }

  // ====================== HEADER EFFECT ======================
  const header = document.querySelector('header');
  const firstSection = document.querySelector('section:first-of-type');
  let lastScroll = window.scrollY;
  let ticking = false;

  if (header && firstSection) {
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
        }, 300);
      }

      lastScroll = current;
    });
  }

  console.log("🎉 Core initialized + premium mode ready");

  // =========================================================
  // 🚀 PROJECTS 2026 PREMIUM SYSTEM (UPGRADED)
  // =========================================================

  const PROJECTS_PER_LOAD = 6;
  let visibleCount = PROJECTS_PER_LOAD;

  const projectsData = [
    {
      id: 1,
      title: "Nova CRM",
      description: "Modern CRM with AI forecasting and analytics.",
      image: "https://picsum.photos/id/1015/1200/800",
      tags: ["React", "TypeScript"],
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "Pulse Analytics",
      description: "Real-time SaaS analytics dashboard.",
      image: "https://picsum.photos/id/201/1200/800",
      tags: ["Next.js", "Framer Motion"],
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Lumina Studio",
      description: "3D scroll-driven portfolio experience.",
      image: "https://picsum.photos/id/237/1200/800",
      tags: ["Three.js"],
      github: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "Forge Platform",
      description: "No-code internal tools builder.",
      image: "https://picsum.photos/id/870/1200/800",
      tags: ["Node.js"],
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "Vesper AI",
      description: "AI writing assistant.",
      image: "https://picsum.photos/id/1016/1200/800",
      tags: ["React"],
      github: "#",
      demo: "#"
    },
    {
      id: 6,
      title: "Echo Social",
      description: "Minimal social platform.",
      image: "https://picsum.photos/id/133/1200/800",
      tags: ["Next.js"],
      github: "#",
      demo: "#"
    }
  ];

  const grid = document.getElementById('projectsGrid');
  const loadBtn = document.getElementById('loadMoreBtn');

  // SETUP MODAL

  function setupModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');

    if (!modal) return;

    // открыть по кнопке View
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn.primary');
      if (!btn) return;

      e.preventDefault();

      const card = btn.closest('.projects__card');
      const title = card.querySelector('.title').textContent;
      const desc = card.querySelector('.description').textContent;
      const img = card.querySelector('img').src;

      openModal({ title, desc, img });
    });

    // закрытие
    closeBtn?.addEventListener('click', closeModal);

    modal.querySelector('.project-modal__backdrop')
      ?.addEventListener('click', closeModal);
  }

  function openModal(data) {
    const modal = document.getElementById('projectModal');

    document.getElementById('modalImage').src = data.img;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;

    modal.classList.add('active');
  }

  function closeModal() {
    document.getElementById('projectModal')
      .classList.remove('active');
  }

  // ====================== RENDER ======================
  function renderProjects() {
    if (!grid) return;

    const slice = projectsData.slice(0, visibleCount);

    grid.innerHTML = '';

    slice.forEach((project, i) => {
      const card = document.createElement('article');
      card.className = 'projects__card';

      card.innerHTML = `
        <div class="projects__media">
          <img src="${project.image}" alt="${project.title}">
          <div class="overlay"></div>
        </div>

        <div class="projects__content">
          <div class="tags">
            ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>

          <h3 class="title">${project.title}</h3>
          <p class="description">${project.description}</p>

          <div class="projects__links">
           <a href="#" class="btn primary">View</a>
            <a href="${project.github}" class="btn ghost">Code</a>
          </div>
        </div>
      `;

      // ✨ stagger animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px) scale(0.98)';

      setTimeout(() => {
        card.style.transition = '0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, i * 70);

      attachGlow(card);
      grid.appendChild(card);
    });

    updateButton();
    observeCards();
  }

  // ====================== LOAD MORE ======================
  function setupLoadMore() {
    if (!loadBtn) return;

    loadBtn.addEventListener('click', () => {
      visibleCount += PROJECTS_PER_LOAD;
      renderProjects();
    });
  }

  function updateButton() {
    if (!loadBtn) return;

    if (projectsData.length <= PROJECTS_PER_LOAD || visibleCount >= projectsData.length) {
      loadBtn.style.display = 'none';
    } else {
      loadBtn.style.display = 'inline-flex';
    }
  }

  // ====================== SCROLL REVEAL ======================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });

  function observeCards() {
    document.querySelectorAll('.projects__card').forEach(card => {
      observer.observe(card);
    });
  }

  // ====================== GLOW ======================
  function attachGlow(card) {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
  }

  renderProjects();
  setupLoadMore();
  setupModal();
});
