/* Progressive motion: ordinary HTML remains readable without JavaScript. */
(() => {
  'use strict';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let observer;

  function stop() {
    observer?.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
  }
  preference.addEventListener('change', () => { if (preference.matches) stop(); });
  if (preference.matches) return;

  // Preserve authored line breaks and the highlighted words inside each heading.
  document.querySelectorAll('.hero h1, .page-hero h1').forEach(heading => {
    const groups = [[]];
    [...heading.childNodes].forEach(node => {
      if (node.nodeName === 'BR') groups.push([]);
      else groups[groups.length - 1].push(node);
    });
    const fragment = document.createDocumentFragment();
    groups.filter(nodes => nodes.some(node => node.textContent.trim())).forEach((nodes, index) => {
      const line = document.createElement('span');
      const inner = document.createElement('span');
      line.className = 'title-line';
      inner.className = 'title-line-inner';
      inner.style.setProperty('--line-index', index);
      nodes.forEach(node => inner.append(node));
      line.append(inner);
      fragment.append(line, document.createTextNode(' '));
    });
    heading.replaceChildren(fragment);
  });

  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  function reveal(target, delay = 0) {
    if (preference.matches || target.contains(document.activeElement)) return;
    const isImage = target.matches('img, .image-frame');
    const animation = target.animate(isImage ? [
      {clipPath: 'inset(0 100% 0 0)'},
      {clipPath: 'inset(0 0 0 0)'}
    ] : [
      {opacity: 0, transform: 'translateY(16px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {
      duration: isImage ? 1000 : 720,
      delay,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'backwards'
    });
    active.add(animation);
    const release = () => active.delete(animation);
    animation.addEventListener('finish', release, {once: true});
    animation.addEventListener('cancel', release, {once: true});
  }

  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    visible.forEach(({target}) => {
      observer.unobserve(target);
      // Stagger only cards entering together; no long wait for a lone mobile card.
      const group = visible.filter(entry => entry.target.parentElement === target.parentElement);
      const delay = target.matches('.service-card, .feature, .value, .process-item, .contact-option')
        ? Math.min(group.findIndex(entry => entry.target === target) * 90, 270) : 0;
      reveal(target, delay);
    });
  }, {threshold: 0, rootMargin: '0px 0px 40px 0px'});

  document.querySelectorAll(
    '.section-head, .service-card, .section > .wrap > h2, ' +
    '.section .split > *, .feature, .value, .process-item, .contact-option, ' +
    '.contact-side, .form-panel, .cta-band .wrap, #enquiry-preview'
  ).forEach(target => {
    if (!target.hidden && target.getBoundingClientRect().top < innerHeight) return;
    observer.observe(target);
  });

  document.addEventListener('focusin', event => {
    active.forEach(animation => {
      if (animation.effect?.target?.contains(event.target)) animation.cancel();
    });
  });
  addEventListener('pagehide', stop, {once: true});
})();

