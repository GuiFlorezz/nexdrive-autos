const formulario = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#busca");
const areaResultados = document.querySelector("#resultados-busca");

const veiculos = [
    { marca: "Honda", modelo: "Civic" },
    { marca: "Toyota", modelo: "Corolla" },
    { marca: "Volkswagen", modelo: "Golf" },
    { marca: "Chevrolet", modelo: "Onix" },
    { marca: "Fiat", modelo: "Argo" }
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

    areaResultados.innerHTML = encontrados.map(function(veiculo) {
        return `<article class="veiculo">
            <h3>${veiculo.marca} ${veiculo.modelo}</h3>
        </article>`;
    }).join("");
});
