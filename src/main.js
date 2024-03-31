function isElementOutOfViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top > window.innerHeight ||
    rect.left > window.innerWidth ||
    rect.bottom < 0 ||
    rect.right < 0
  );
}

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });

  // Close mobile menu on link click
  const menuLinks = mobileMenu.querySelectorAll('.nav-link');
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // scrollTop
  const scrollTopBtn = document.querySelector('.scroll-top-button');
  scrollTopBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  document.addEventListener('scroll', e => {
    const firstSection = document.querySelector('section');
    const scrollTopBtnIsVisible = scrollTopBtn.checkVisibility({
      opacityProperty: true,
    });

    if (
      !!firstSection &&
      isElementOutOfViewport(firstSection) &&
      !scrollTopBtnIsVisible
    ) {
      scrollTopBtn.classList.add('visible');
    } else if (!isElementOutOfViewport(firstSection) && scrollTopBtnIsVisible) {
      scrollTopBtn.classList.remove('visible');
    } else {
      return;
    }
  });
})();
