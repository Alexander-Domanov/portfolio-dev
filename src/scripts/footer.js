export function initFooter() {
  const year = document.getElementById('year');

  if (!year) return;

  year.textContent = new Date().getFullYear();
}
