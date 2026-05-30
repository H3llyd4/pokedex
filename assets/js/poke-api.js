const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilites = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    pokemon.stats = {
        hp: pokeDetail.stats[0].base_stat,
        attack: pokeDetail.stats[1].base_stat,
        defense: pokeDetail.stats[2].base_stat,
        spAtk: pokeDetail.stats[3].base_stat,
        spDef: pokeDetail.stats[4].base_stat,
        speed: pokeDetail.stats[5].base_stat
    };

    return pokemon;

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then((pokeDetail) =>{
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);
            
            return fetch(pokeDetail.species.url)
            .then(reponseSpecies => reponseSpecies.json())
            .then(speciesDetail => {
                pokemon.eggGroups = speciesDetail.egg_groups.map(eggGroup => eggGroup.name);

                return fetch(speciesDetail.evolution_chain.url)
                    .then(responseEvolution => responseEvolution.json())
                    .then(evolutionDetail => {
                        const evolutions = [];
                        let currentEvolution = evolutionDetail.chain;

                        do {
                            evolutions.push(currentEvolution.species.name);
                            currentEvolution = currentEvolution.evolves_to[0];
                        } while (currentEvolution && currentEvolution.hasOwnProperty('evolves_to'));

                        pokemon.evolutions = evolutions;

                        return pokemon;
                    });
            });

        });
}
