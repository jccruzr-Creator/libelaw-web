'use strict';
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const topLink = document.querySelector('.back-to-top');
  let pending = false;
  function updateScroll() {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${range > 0 ? Math.min(100, window.scrollY / range * 100) : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 12);
    topLink.classList.toggle('visible', window.scrollY > 600);
    pending = false;
  }
  window.addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();
  const cards = [...document.querySelectorAll('.service')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) { count++; card.classList.add('is-visible'); }
    });
    document.getElementById('service-count').textContent = `${count} ${count === 1 ? 'servicio' : 'servicios'}`;
    updateScroll();
  }));
  if ('IntersectionObserver' in window && !reduced.matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.section-heading,.service,.founder-heading,.founder-copy,.steps li,.booking-copy,.booking-form,.clarity-inner,.faq-section>div').forEach(element => {
      element.classList.add('reveal-ready'); reveal.observe(element);
    });
    reduced.addEventListener('change', event => { if (event.matches) document.querySelectorAll('.reveal-ready').forEach(el => el.classList.add('is-visible')); });
  }
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('#main-nav a[href^="#"]')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
