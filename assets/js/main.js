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
      <div id="mMeasurements">
        <p class="highlight">Infos</p>
        <p class="highlight"><img src="assets/images/height.png" title="height" alt="height" /> <span class="attribute">${
          pokemon.height
        } in</span></p>
        <p class="highlight"><img src="assets/images/weight.png" title="weight" alt="weight" /> <span class="attribute">${
          pokemon.weight
        } lbs</span></p>
      </div>

      <div id="mStats">
        <p class="highlight">Stats</p>
        <p class="highlight"><img src="assets/images/hp.svg" title="health" alt="health" /> <span class="attribute">${
          pokemon.hp
        }<span></p>
        <p class="highlight"><img src="assets/images/attack.png" title="attack" alt="attack" /> <span class="attribute">${
          pokemon.attack
        }<span></p>
        <p class="highlight"><img src="assets/images/special_attack.png" title="special_attack" alt="special_attack" /> <span class="attribute">${
          pokemon.special_attack
        }<span></p>
        <p class="highlight"><img src="assets/images/defense.png" title="defense" alt="defense" /> <span class="attribute">${
          pokemon.defense
        }<span></p>
        <p class="highlight"><img src="assets/images/special_defense.png" title="special_defense" alt="special_defense" /> <span class="attribute">${
          pokemon.special_defense
        }<span></p>
        <p class="highlight"><img src="assets/images/speed.png" title="speed" alt="speed" /> <span class="attribute">${
          pokemon.speed
        }<span></p>
      </div>
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
