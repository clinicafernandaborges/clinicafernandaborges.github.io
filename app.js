const protocolsData = [
  {
    id: 1,
    category: 'diagnostico',
    badge: 'Porta de Entrada • IA 3D',
    name: 'K-Skin Check 3D (Consulta Diagnóstica)',
    duration: '45 min',
    steps: 'Escaneamento facial 3D IA (8 parâmetros: poros, manchas UV, porfirinas, rugas, textura, hidratação e idade biológica) + Mapa da Barreira Cutânea + Prescrição Home Care (valor abatido no pacote).',
    price: 'R$ 180,00'
  },
  {
    id: 2,
    category: 'facial',
    badge: 'Carro-Chefe • Best Seller',
    name: 'Protocolo Assinatura Glass Skin 10 Passos',
    duration: '75 min',
    steps: 'Double Cleansing (Oil + Low pH Foam) + Aqua Peel (AHA/BHA) + Toner Pad + Essence Fermentada + Eletroporação de Ácido Hialurônico + Hydrojelly Mask + Fototerapia LED.',
    price: 'R$ 390,00'
  },
  {
    id: 3,
    category: 'facial',
    badge: 'Peles Sensíveis & Acneicas',
    name: 'Cica Acne & Pore Control',
    duration: '60 min',
    steps: 'Limpeza ultrassônica + Extração a vácuo suave + Infusão de Centella Asiática (Madecassoside) e Heartleaf + LED Azul (415nm) / Vermelho (633nm) + Máscara Oclusiva de Artemísia (Mugwort).',
    price: 'R$ 340,00'
  },
  {
    id: 4,
    category: 'lifting',
    badge: 'Alta Biotecnologia',
    name: 'K-Bio Rejuvenation (PDRN & Exossomos)',
    duration: '90 min',
    steps: 'Preparo enzimático suave + Nanoagulhamento ou Microagulhamento + Drug Delivery estéril de PDRN (DNA de Salmão) ou Exossomos + Máscara Bio-Colágeno Hidrogel.',
    price: 'R$ 890,00'
  },
  {
    id: 5,
    category: 'lifting',
    badge: 'Contorno Mandibular',
    name: 'V-Line Korean Lifting',
    duration: '75 min',
    steps: 'Massagem Miofascial Coreana (Gua Sha de Quartzo Rosa) + Criofrequência ou HIFU localizado (camada SMAS) + Máscara tensora de Peptídeos e Ouro 24k.',
    price: 'R$ 650,00'
  },
  {
    id: 6,
    category: 'headspa',
    badge: 'Suíte VIP • ASMR',
    name: 'Royal Korean Head Spa (Terapia Capilar & Relax)',
    duration: '75 min',
    steps: 'Diagnóstico com tricoscópio digital + Detox de couro cabeludo + Lavatório coreano em arco dourado de água térmica contínua + Massagem craniana + Vapor de Ozônio e Cromoterapia.',
    price: 'R$ 420,00'
  },
  {
    id: 7,
    category: 'clube',
    badge: 'Recorrência VIP',
    name: 'Assinatura Mensal K-Club Glow',
    duration: 'Mensal',
    steps: '1 Sessão completa Glass Skin 10 Passos + 1 Sessão Express de LEDterapia & Hydrojelly Mask + 15% OFF fixo no K-Beauty Bar (Home Care) + Chá Boricha/Matcha Lounge.',
    price: 'R$ 449,00/mês'
  }
];

function renderProtocols(filter = 'all') {
  const grid = document.getElementById('protocolsGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? protocolsData
    : protocolsData.filter(item => item.category === filter);

  grid.innerHTML = filtered.map(p => `
    <article class="protocol-card">
      <div>
        <div class="protocol-top">
          <span class="protocol-badge">${p.badge}</span>
          <span class="protocol-duration">⏱ ${p.duration}</span>
        </div>
        <h3>${p.name}</h3>
        <p class="protocol-steps">${p.steps}</p>
      </div>
      <div>
        <div class="protocol-footer">
          <div class="price-block">
            <span class="price-label">Investimento Sessão</span>
            <span class="price-value">${p.price}</span>
          </div>
          <button class="btn-pastel" onclick="openBookingModal('${p.name.replace(/'/g, "\\'")}')">
            Agendar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function openBookingModal(protocolName = 'K-Skin Check 3D (Consulta Diagnóstica)') {
  const modal = document.getElementById('bookingModal');
  const select = document.getElementById('protocolSelect');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === protocolName) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  modal.classList.add('open');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('open');
}

function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value;
  const protocol = document.getElementById('protocolSelect').value;
  const feedback = document.getElementById('bookingFeedback');
  feedback.style.display = 'block';
  feedback.innerHTML = `✨ Perfeito, <strong>${name}</strong>! Sua solicitação para <strong>${protocol}</strong> na <strong>Clínica Fernanda Borges</strong> foi registrada. Nossa Concierge entrará em contato via WhatsApp com o menu de chás coreanos!`;
  setTimeout(() => {
    closeBookingModal();
    feedback.style.display = 'none';
    e.target.reset();
  }, 3800);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProtocols('all');

  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProtocols(btn.dataset.filter);
    });
  });
});

