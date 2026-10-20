const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#busca");
const areaResultados = document.querySelector("#resultados-busca");


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

    const termo = campoBusca.value.trim().toLowerCase();

    if (termo === "") {
        areaResultados.innerHTML =
            "<p>Digite uma marca ou modelo para pesquisar.</p>";
        return;
    }

    const encontrados = veiculos.filter(function(veiculo) {
        return veiculo.marca.toLowerCase().includes(termo) ||
            veiculo.modelo.toLowerCase().includes(termo);
    });

    if (encontrados.length === 0) {
        areaResultados.innerHTML =
            "<p>Nenhum veículo encontrado. Tente outra pesquisa.</p>";
        return;
    }

    exibirVeiculos(encontrados);
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