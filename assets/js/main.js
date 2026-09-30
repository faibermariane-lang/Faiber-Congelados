/* ==========================================================
   Faiber Congelados · configurações do site
   Altere aqui e o site inteiro é atualizado.
   ========================================================== */
const WHATSAPP_NUMERO = '554991995920';            // DDI + DDD + número, só dígitos
const WHATSAPP_EXIBICAO = '(49) 99199-5920';       // como o telefone aparece na tela
const EMAIL = 'administrativo@faibercongelados.com';
const ANO_FUNDACAO = 2008;

const waLink = (mensagem) =>
  `https://wa.me/${WHATSAPP_NUMERO}` + (mensagem ? `?text=${encodeURIComponent(mensagem)}` : '');

/* Links de WhatsApp com mensagem pronta (atributo data-wa) */
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.href = waLink(el.dataset.wa);
});

document.querySelectorAll('[data-telefone]').forEach((el) => {
  el.textContent = WHATSAPP_EXIBICAO;
});

document.querySelectorAll('[data-email]').forEach((el) => {
  el.href = `mailto:${EMAIL}`;
  el.textContent = EMAIL;
});

document.querySelectorAll('[data-ano-fundacao]').forEach((el) => {
  el.textContent = ANO_FUNDACAO;
});

document.querySelectorAll('[data-ano-atual]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* Header: ganha fundo ao rolar */
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Carrossel de produtos */
const track = document.querySelector('[data-carousel]');
if (track) {
  const step = () => {
    const card = track.querySelector('.product');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
  });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* Formulário de contato: monta a mensagem e abre o WhatsApp */
const form = document.querySelector('[data-contact-form]');
if (form) {
  const erro = form.querySelector('[data-form-error]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));
    const nome = (dados.nome || '').trim();
    if (!nome) {
      erro.hidden = false;
      form.elements.nome.focus();
      return;
    }
    erro.hidden = true;

    const linhas = [
      'Olá! Vim pelo site da Faiber Congelados.',
      '',
      `Nome: ${nome}`,
    ];
    if (dados.empresa.trim()) linhas.push(`Empresa: ${dados.empresa.trim()}`);
    if (dados.cidade.trim()) linhas.push(`Cidade: ${dados.cidade.trim()}`);
    linhas.push(`Interesse: ${dados.interesse}`);

    window.open(waLink(linhas.join('\n')), '_blank', 'noopener');
  });
}
