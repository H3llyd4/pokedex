const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 200;
const limit = 10;
let offset = 0;

function loadPokemonsItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" style="cursor: pointer;" onclick="window.location.href='ficha.html?id=${pokemon.number}'">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
             
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
         </li>
    `).join('')

        pokemonList.innerHTML += newHTML
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset 
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }
})