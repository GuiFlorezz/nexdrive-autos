const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#busca");
const areaResultados = document.querySelector("#resultados-busca");

const campoPrecoMin = document.querySelector("#preco-min");
const campoPrecoMax = document.querySelector("#preco-max");

const campoAnoMin = document.querySelector("#ano-min");
const campoAnoMax = document.querySelector("#ano-max");

const campoCombustivel = document.querySelector("#combustivel");
const botaoLimparFiltros = document.querySelector("#limpar-filtros");

const veiculos = [
    {
        marca: "Honda",
        modelo: "Civic",
        ano: 2022,
        preco: 115900,
        quilometragem: 32000,
        combustivel: "Flex"
    },
    {
        marca: "Toyota",
        modelo: "Corolla",
        ano: 2023,
        preco: 139900,
        quilometragem: 25000,
        combustivel: "Flex"
    },
    {
        marca: "Volkswagen",
        modelo: "Golf",
        ano: 2020,
        preco: 109900,
        quilometragem: 48000,
        combustivel: "Gasolina"
    },
    {
        marca: "Chevrolet",
        modelo: "Onix",
        ano: 2024,
        preco: 82900,
        quilometragem: 12000,
        combustivel: "Flex"
    },
    {
        marca: "Fiat",
        modelo: "Argo",
        ano: 2023,
        preco: 74900,
        quilometragem: 18000,
        combustivel: "Flex"
    }
];



formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    filtrarVeiculos();
});

campoPrecoMin.addEventListener("input", filtrarVeiculos);
campoPrecoMax.addEventListener("input", filtrarVeiculos);

campoAnoMin.addEventListener("input", filtrarVeiculos);
campoAnoMax.addEventListener("input", filtrarVeiculos);

campoCombustivel.addEventListener("change", filtrarVeiculos);

botaoLimparFiltros.addEventListener("click", function() {
    campoPrecoMin.value = "";
    campoPrecoMax.value = "";

    campoAnoMin.value = "";
    campoAnoMax.value = "";

    campoCombustivel.value = "";
    campoBusca.value = "";

    filtrarVeiculos();
});



function criarCard(veiculo){
    return `
        <article class="veiculo">
            <h3>${veiculo.marca} ${veiculo.modelo}</h3>
            <p><strong>Ano:</strong> ${veiculo.ano}</p>
            <p><strong>Preço:</strong> ${veiculo.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</p>
            <p><strong>Quilometragem:</strong> ${veiculo.quilometragem.toLocaleString("pt-BR")} km</p>
            <p><strong>Combustível:</strong> ${veiculo.combustivel}</p>
        </article>
    `;
}

function exibirVeiculos(lista){
    areaResultados.innerHTML = lista.map(criarCard).join("");
}


function filtrarVeiculos() {
    const termo = campoBusca.value.trim().toLowerCase();

    const precoMin = campoPrecoMin.value === ""
        ? null
        : Number(campoPrecoMin.value);

    const precoMax = campoPrecoMax.value === ""
        ? null
        : Number(campoPrecoMax.value);

    const anoMin = campoAnoMin.value === ""
        ? null
        : Number(campoAnoMin.value);

    const anoMax = campoAnoMax.value === ""
        ? null
        : Number(campoAnoMax.value);

    const combustivel = campoCombustivel.value;
    
    if (
    precoMin !== null &&
    precoMax !== null &&
    precoMin > precoMax
) {
    areaResultados.innerHTML =
        "<p>O preço mínimo não pode ser maior que o preço máximo.</p>";
    return;
}

if (
    anoMin !== null &&
    anoMax !== null &&
    anoMin > anoMax
) {
    areaResultados.innerHTML =
        "<p>O ano mínimo não pode ser maior que o ano máximo.</p>";
    return;
}

    const encontrados = veiculos.filter(function(veiculo) {
        const correspondeTexto =
            veiculo.marca.toLowerCase().includes(termo) ||
            veiculo.modelo.toLowerCase().includes(termo);

        const correspondePrecoMin =
            precoMin === null || veiculo.preco >= precoMin;

        const correspondePrecoMax =
            precoMax === null || veiculo.preco <= precoMax;

        const correspondeAnoMin =
            anoMin === null || veiculo.ano >= anoMin;

        const correspondeAnoMax =
            anoMax === null || veiculo.ano <= anoMax;

        const correspondeCombustivel =
            combustivel === "" ||
            veiculo.combustivel === combustivel;

        return correspondeTexto &&
            correspondePrecoMin &&
            correspondePrecoMax &&
            correspondeAnoMin &&
            correspondeAnoMax &&
            correspondeCombustivel;
    });

    if (encontrados.length === 0) {
        areaResultados.innerHTML =
            "<p>Nenhum veículo encontrado. Tente alterar os filtros.</p>";
        return;
    }

    exibirVeiculos(encontrados);
}
