const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const pokemonNameDiv = document.getElementById('pokemonName');
const pokemonNumberDiv = document.getElementById('pokemonNumber');
const pokemonImageDiv = document.getElementById('pokemonImage');
const pokemonTypesUl = document.getElementById('pokemonTypes');
const pokemonHeaderDiv = document.getElementById('pokemonHeader');

if (pokemonId) {

    pokeApi.getPokemonDetailById(pokemonId).then((pokemon) => {
        
        pokemonNameDiv.innerText = pokemon.name;
        pokemonNumberDiv.innerText = `#${pokemon.number}`;
        pokemonImageDiv.src = pokemon.photo;
        pokemonImageDiv.alt = pokemon.name;

        pokemonHeaderDiv.className = `pokemon-header ${pokemon.type}`;

        const typesHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
        pokemonTypesUl.innerHTML = typesHTML;
    });
} else {
    window.location.href = 'pokedex.html';
}