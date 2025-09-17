// Lógica de alternância do menu e ícones no mobile
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('navbar-dropdown');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();

  const isHidden = menu.classList.contains('hidden');

  if (isHidden) {
    menu.classList.remove('hidden');
    setTimeout(() => menu.style.maxHeight = menu.scrollHeight + "px", 10);
  } else {
    menu.style.maxHeight = "0px";
    menu.addEventListener('transitionend', () => {
      if (menu.style.maxHeight === "0px") menu.classList.add('hidden');
    }, { once: true });
  }

  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');

  hamburger.setAttribute('aria-expanded', isHidden);
});

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.style.maxHeight = "0px";
    menu.addEventListener('transitionend', () => menu.classList.add('hidden'), { once: true });
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Seleciona todos os cards
const cards = document.querySelectorAll('.card');

// Verifica card tela
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50
  );
}

// Animação
function showCards() {
  cards.forEach(card => {
    if (isInViewport(card)) {
      card.classList.remove('opacity-0', 'translate-y-10');
      card.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-700', 'ease-out');
    }
  });
}

// Executa no scroll e na carga inicial
window.addEventListener('scroll', showCards);
window.addEventListener('load', showCards);
