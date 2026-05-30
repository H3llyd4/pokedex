const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const pokemonNameDiv = document.getElementById('pokemonName');
const pokemonNumberDiv = document.getElementById('pokemonNumber');
const pokemonImageDiv = document.getElementById('pokemonImage');
const pokemonTypesUl = document.getElementById('pokemonTypes');
const pokemonContentSection = document.getElementsByClassName('content');
const pokemonSpecies = document.getElementById('pokemonSpecies');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonAbilitiesUl = document.getElementById('pokemonAbilities');
const pokemonEggGroups = document.getElementById('pokemonEggGroups');



if (pokemonId) {

    pokeApi.getPokemonDetailById(pokemonId).then((pokemon) => {
        
        pokemonNameDiv.innerText = pokemon.name;
        pokemonNumberDiv.innerText = `#${pokemon.number}`;
        pokemonImageDiv.src = pokemon.photo;
        pokemonImageDiv.alt = pokemon.name;

        pokemonAbilitiesUl.innerHTML = pokemon.abilites.join(', ');

        pokemonContentSection[0].className = `content ${pokemon.type}`;

        const typesHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
        pokemonTypesUl.innerHTML = typesHTML;

        pokemonSpecies.innerText = pokemon.species;

        //Claculo de altura e peso
        const heightInM = pokemon.height/10;
        const heightInFt = (heightInM * 3.28084).toFixed(1);
        pokemonHeight.innerText = `${heightInFt}' (${heightInM}m)`;

        const weightInKg = pokemon.weight/10;
        const weightInLbs = (weightInKg * 2.20462).toFixed(1);
        pokemonWeight.innerText = `${weightInLbs} lbs (${weightInKg} kg)`;
        

        pokemonEggGroups.innerText = pokemon.eggGroups.join(', ');

    });
} else {
    window.location.href = 'pokedex.html';
}