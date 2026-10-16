'use strict';
(() => {
  const config = window.LIBELAW_CONFIG;
  const form = document.getElementById('booking-form');
  const status = document.getElementById('form-status');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const privacy = document.getElementById('privacy-dialog');
  const todayInPeru = () => {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const get = type => parts.find(part => part.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  };
  const whatsapp = message => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  date.min = todayInPeru();
  document.getElementById('year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsapp(config.directMessage); });
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded)); nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    document.getElementById('service').value = link.dataset.service;
    status.textContent = '';
  }));
  for (const field of [date, time]) field.addEventListener('input', () => { date.setCustomValidity(''); time.setCustomValidity(''); status.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    date.min = todayInPeru(); date.setCustomValidity(''); time.setCustomValidity('');
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim().replace(/\s+/g, ' ');
    if (!name) { status.textContent = 'Escribe tu nombre para preparar la solicitud.'; form.elements.name.focus(); return; }
    const requested = new Date(`${date.value}T${time.value}:00-05:00`);
    if (!Number.isFinite(requested.getTime()) || requested <= new Date()) {
      time.setCustomValidity('Elige una fecha y hora futuras en horario de Perú.'); time.reportValidity(); return;
    }
    const readable = new Intl.DateTimeFormat('es-PE', {timeZone:'America/Lima',day:'numeric',month:'long',year:'numeric'}).format(requested);
    const message = `Hola, LIBELAW. Soy ${name}.\nQuisiera solicitar una consulta virtual.\nServicio: ${form.elements.service.value}.\nFecha preferida: ${readable}.\nHora preferida: ${time.value} (hora de Perú, UTC-5).\n¿Podrían confirmarme la disponibilidad y los honorarios? Entiendo que este mensaje es una solicitud, no una reserva confirmada.`;
    const link = document.createElement('a');
    link.href = whatsapp(message); link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.click();
    status.replaceChildren(document.createTextNode('Tu solicitud está preparada. '));
    const retry = document.createElement('a'); retry.href = link.href; retry.target = '_blank'; retry.rel = 'noopener noreferrer'; retry.textContent = 'Abrir WhatsApp si no se abrió'; retry.style.textDecoration = 'underline'; status.append(retry);
  });
  document.querySelectorAll('[data-open-privacy]').forEach(button => button.addEventListener('click', () => privacy.showModal()));
  privacy.querySelector('.dialog-close').addEventListener('click', () => privacy.close());
  privacy.addEventListener('click', event => { if (event.target === privacy) { const r=privacy.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) privacy.close(); } });
})();
