// Função responsável por ler a API CoinBase e obter os dados em formato JSON
async function carregarDados() {
    // Chamando a API para obter os dados
    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries') // Chamando endereço da API
        .then(response => response.json())  // Obtendo a resposta e formatando como JSON
        .then(dados => prepararDadoos(dados))  // Chamando função para gerar HTML dinâmico
        .catch(e => alert(e.message));
}

function prepararDadoos(dados) {

    dados_mapa = [['País', 'Casos']];
    dados_pizza = [['Status', 'Total']];

    let totalCasos = 0;
    let totalMortos = 0;
    let totalRecuperados = 0;

    let nomePais = "";
    let casos = 0;

    for (i = 0; i < dados['data'].length; i++) {
        nomePais = dados['data'][i].country;
        casos = dados['data'][i].confirmed;
        dados_mapa.push([nomePais, casos])

        totalCasos = totalCasos + dados['data'][i].confirmed;
        totalMortos = totalMortos + dados['data'][i].deaths;
    }

    // Inserindo os totais acumulados no gráficos de pizza
    dados_pizza.push(['Confirmados', totalCasos])
    dados_pizza.push(['Mortes', totalMortos])
    dados_pizza.push(['Recuperados', totalRecuperados])

    desenharMapa();
    desenhandoGraficoPizza();
}

var dados_mapa = [
    ['País', 'Casos'],
    ['0', 0]
];

google.charts.load('current', { 'packages': ['geochart'], });
google.charts.setOnLoadCallback(desenharMapa);

function desenharMapa() {
    let data = google.visualization.arrayToDataTable(dados_mapa);
    let options = {
        colorAxis: { colors: ['#8C2626'] },
        backgroundColor: 'lightblue'
    };
    let chart = new google.visualization.GeoChart(document.getElementById('mapa'));
    chart.draw(data, options);
}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////PIZZAAAA///////////////////////////////////////////////////////////

var dados_pizza = [
    ['Status', 'Total'],
    ['0', 0]
];

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(desenhandoGraficoPizza);

function desenhandoGraficoPizza() {

    let data = google.visualization.arrayToDataTable(dados_pizza);

    let options = {
        is3D: true,
        legend: {position: 'bottom'}
    };
    ;
    let chart = new google.visualization.PieChart(document.getElementById('graficoPizza'));

    chart.draw(data, options);
}


////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////TABELA/////////////////////////////////////////////////////////////////

async function carregarOsDados() {
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')            // Chamando endereço da API
        .then(response => response.json())                                   // Obtendo a resposta e formatando como JSON
        .then(dados => prepararOsDados(dados))                              // Chamando função para gerar HTML dinâmico
}

function prepararOsDados(dados) {
    let linhas = document.getElementById('tabelas');
    linhas.innerHTML = '';

    for (let i = 0; i < dados['data'].length; i++) {
        let auxLinha = '';

        auxLinha = auxLinha + '<tr>' + '<td>' + dados['data'][i].uf + '</td>'
            + '<td>' + dados['data'][i].state + '</td>'
            + '<td>' + dados['data'][i].cases + '</td>'
            + '<td class="sumir">' + dados['data'][i].deaths + '</td>'
            + '<td class="sumir">' + dados['data'][i].suspects + '</td>' + '</tr>';

        linhas.innerHTML = linhas.innerHTML + auxLinha
    }

}

var dados_tabela = [
    ['Sigla', 'Estado', 'Casos', 'Mortes', 'Suspeitos', 'Descartados'],
    ['0', 0, 0, 0, 0, 0]
];

document.addEventListener('DOMContentLoaded', function (event) {
    carregarDados();
    carregarOsDados();
}
);


////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded",
    function (event) {
        carregarDados();
    }
);
