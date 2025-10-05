// script.js

// Banco de dados de materiais
const materiais = {
  cimento: {
    precoInterno: 35.00,
    precoMercado: 38.50,
    faixaIdeal: [30, 40],
    maoDeObra: 15.00
  },
  madeira: {
    precoInterno: 55.00,
    precoMercado: 60.00,
    faixaIdeal: [50, 65],
    maoDeObra: 25.00
  },
  azulejo: {
    precoInterno: 75.00,
    precoMercado: 80.00,
    faixaIdeal: [70, 90],
    maoDeObra: 20.00
  },
  tinta: {
    precoInterno: 20.00,
    precoMercado: 22.00,
    faixaIdeal: [18, 25],
    maoDeObra: 10.00
  }
};

document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const materialSelecionado = document.getElementById('material').value;
  const area = parseFloat(document.getElementById('area').value);
  const resultadoDiv = document.getElementById('resultado');

  // Validação
  if (!materialSelecionado || isNaN(area) || area <= 0) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `<p style="color: red;">Por favor, selecione um material e insira uma área válida.</p>`;
    return;
  }

  const dados = materiais[materialSelecionado];
  const { precoInterno, precoMercado, faixaIdeal, maoDeObra } = dados;

  const custoMaterial = precoInterno * area;
  const custoMaoDeObra = maoDeObra * area;
  const custoTotal = custoMaterial + custoMaoDeObra;

  const [faixaMin, faixaMax] = faixaIdeal;
  const foraDaFaixa = precoInterno < faixaMin || precoInterno > faixaMax;

  // Montagem do resultado
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
    <p><strong>Material:</strong> ${materialSelecionado.charAt(0).toUpperCase() + materialSelecionado.slice(1)}</p>
    <p><strong>Área:</strong> ${area.toFixed(2)} m²</p>
    <hr>
    <p><strong>Preço Interno por m²:</strong> R$ ${precoInterno.toFixed(2)}</p>
    <p><strong>Preço de Mercado:</strong> R$ ${precoMercado.toFixed(2)}</p>
    <p><strong>Faixa Ideal:</strong> R$ ${faixaMin.toFixed(2)} - R$ ${faixaMax.toFixed(2)}</p>
    ${foraDaFaixa ? `<p class="alerta">⚠️ O preço está fora da faixa ideal!</p>` : `<p style="color:green;">✅ Preço dentro da faixa ideal.</p>`}
    <hr>
    <p><strong>Custo do Material:</strong> R$ ${custoMaterial.toFixed(2)}</p>
    <p><strong>Custo da Mão de Obra:</strong> R$ ${custoMaoDeObra.toFixed(2)} (${maoDeObra.toFixed(2)} por m²)</p>
    <p><strong>Custo Total:</strong> <span style="font-size: 1.2rem;">R$ ${custoTotal.toFixed(2)}</span></p>
  `;
});
