const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 200;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li onclick="openModal(${pokemon.number}, '${
    pokemon.type
  }')" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function convertPokemonToDetailedInfos(pokemon) {
  return `
    <div id="mBasicInfos">
      <div id="mNameNumberType">
        <span id="mName">${pokemon.name}</span>
        <span id="mNumber">#${pokemon.number}</span>
      </div>

      <ol id="mTypes">
        ${pokemon.types
          .map((type) => `<li id="mType" class="${type}">${type}</li>`)
          .join("")}
      </ol>

      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    <div id="mDetailedInfos">
      
    </div>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

// Pagination
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
