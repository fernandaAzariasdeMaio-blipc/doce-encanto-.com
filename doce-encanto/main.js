// ===========================
// DOCE ENCANTO – main.js
// ===========================

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // fechar ao clicar em link
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.section-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// --- Filtros do cardápio ---
const filtros = document.querySelectorAll('.filtro-btn');
const produtos = document.querySelectorAll('.produto-card[data-category]');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    produtos.forEach(card => {
      const cats = card.dataset.category || '';
      if (filter === 'todos' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- Formulário → WhatsApp ---
const pedidoForm = document.getElementById('pedidoForm');
if (pedidoForm) {
  pedidoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome')?.value || '';
    const whatsapp = document.getElementById('whatsapp')?.value || '';
    const ocasiao = document.getElementById('ocasiao')?.value || '';
    const data = document.getElementById('data')?.value || '';
    const mensagem = document.getElementById('mensagem')?.value || '';

    const produtosSelecionados = Array.from(
      document.querySelectorAll('input[name="produtos"]:checked')
    ).map(cb => cb.value.replace(/-/g, ' ')).join(', ');

    let texto = `Olá! Gostaria de fazer um pedido 🍫\n\n`;
    texto += `*Nome:* ${nome}\n`;
    if (ocasiao) texto += `*Ocasião:* ${ocasiao}\n`;
    if (produtosSelecionados) texto += `*Produtos:* ${produtosSelecionados}\n`;
    if (data) texto += `*Data desejada:* ${formatarData(data)}\n`;
    if (mensagem) texto += `*Observações:* ${mensagem}\n`;

    // IMPORTANTE: Substitua o número abaixo pelo número real da Doce Encanto
    const numero = '5500000000000';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
}

function formatarData(dataStr) {
  if (!dataStr) return '';
  const [y, m, d] = dataStr.split('-');
  return `${d}/${m}/${y}`;
}
