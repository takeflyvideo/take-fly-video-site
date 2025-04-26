// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
      }
    });
  }, { threshold: 0.2 });
  targets.forEach(t => observer.observe(t));
});
