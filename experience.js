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
  const expand = document.getElementById('services-expand');
  const countLabel = document.getElementById('service-count');
  const renderServices = () => {
    const active = filters.find(button => button.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'all';
    const expanded = expand.getAttribute('aria-expanded') === 'true';
    let visible = 0;
    cards.forEach(card => {
      const matches = active === 'all' || card.dataset.category === active;
      card.hidden = !matches || (active === 'all' && !expanded && card.classList.contains('service-extra'));
      if (!card.hidden) { visible++; card.classList.add('is-visible'); }
    });
    countLabel.textContent = active === 'all' && !expanded ? 'Mostrando 6 de 11 servicios' : `${visible} de 11 servicios`;
    expand.hidden = active !== 'all';
    expand.innerHTML = expanded ? 'Ver menos servicios <span aria-hidden="true">↑</span>' : 'Ver los 11 servicios <span aria-hidden="true">↓</span>';
    updateScroll();
  };
  document.querySelectorAll('.service>a[data-service]').forEach(link => link.remove());
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    renderServices();
  }));
  expand.addEventListener('click', () => { expand.setAttribute('aria-expanded', String(expand.getAttribute('aria-expanded') !== 'true')); renderServices(); });
  renderServices();
  const openDialog = (selector, id) => document.querySelectorAll(selector).forEach(button => button.addEventListener('click', () => document.getElementById(id).showModal()));
  openDialog('[data-open-philosophy]', 'philosophy-dialog');
  openDialog('[data-open-mission-vision]', 'mission-vision-dialog');
  openDialog('[data-open-terms]', 'terms-dialog');
  openDialog('[data-open-cookies]', 'cookies-dialog');
  openDialog('[data-open-complaints]', 'complaints-dialog');
  document.querySelectorAll('dialog:not(#privacy-dialog)').forEach(dialog => dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()));
  const mark = document.querySelector('.site-header .brand-symbol');
  for (let part = 0; part < 3; part++) {
    const segment = document.createElement('span');
    segment.className = `logo-segment logo-segment-${part + 1}`;
    segment.setAttribute('aria-hidden', 'true');
    mark.append(segment);
  }
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
