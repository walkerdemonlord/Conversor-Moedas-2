document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = '7c6d3ca0d7ba4f00b0a978dc42963423';
    const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

    const valorInput = document.querySelector('#valor-total');
    let taxasCambio = {};

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter as taxas de câmbio: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            taxasCambio = data.rates;
            console.log(taxasCambio); // Verifica se as taxas de câmbio foram obtidas corretamente
            valorInput.addEventListener('input', conversao); // Adiciona o event listener apenas após carregar os dados
        })
        .catch(error => console.error('Erro ao obter as taxas de câmbio:', error));

    function conversao() {
        const valor = parseFloat(valorInput.value);
        if (isNaN(valor) || !taxasCambio.USD || !taxasCambio.GBP || !taxasCambio.CNY || !taxasCambio.BRL || !taxasCambio.EUR) {
            return;
        }

        let resultadoReal = valor; // Valor em BRL (não precisa multiplicar pela taxa de câmbio de BRL)
        let resultadoDolar = valor * taxasCambio.USD / taxasCambio.BRL; // Converte de BRL para USD
        let resultadoLibra = valor * taxasCambio.GBP / taxasCambio.BRL; // Converte de BRL para GBP
        let resultadoYuan = valor * taxasCambio.CNY / taxasCambio.BRL; // Converte de BRL para CNY
        let resultadoEuro = valor * taxasCambio.EUR / taxasCambio.BRL;

        document.querySelector('#valor-real').textContent = resultadoReal.toFixed(2); // Exibe o valor original em BRL
        document.querySelector('#valor-dolar').textContent = resultadoDolar.toFixed(2);
        document.querySelector('#valor-libra').textContent = resultadoLibra.toFixed(2);
        document.querySelector('#valor-yuan').textContent = resultadoYuan.toFixed(2);
        document.querySelector('#valor-euro').textContent = resultadoEuro.toFixed(2);
    }
});
