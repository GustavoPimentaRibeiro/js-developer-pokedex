async function openModal(id, type) {
  const pokemonDetail = document.getElementById("modalContent");
  pokemonDetail.className = `modal-content ${type}`;

  const pokemon = await pokeApi.getPokemonModalInfo(id);

  console.log(pokemon);

  document.getElementById("modalPokemon").style.display = "block";
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("modalPokemon").style.display = "none";
}
