const modalInfos = document.getElementById("pokemonModalInfos");

async function openModal(id, type) {
  const pokemonCompleteInfos = await getPokemonInfos(id);
  const newHtml = await convertPokemonToDetailedInfos(pokemonCompleteInfos);
  await modifyModalColor(type);
  modalInfos.innerHTML = newHtml;

  document.getElementById("modalPokemon").style.display = "block";
}

function closeModal() {
  document.getElementById("modalPokemon").style.display = "none";
}

function getPokemonInfos(id) {
  return pokeApi.getPokemonModalInfo(id);
}

function modifyModalColor(type) {
  const pokemonDetail = document.getElementById("modalContent");
  pokemonDetail.className = `modal-content ${type}`;
}
