const axios  = require('axios')
const {Pokemon, Type} = require('../db')
const { Op } = require('sequelize')








const infoCleaner = (pokemon) => {
   

    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        type:
          pokemon.types.length < 2
            ? [pokemon.types[0].type.name]
            : [pokemon.types[0].type.name, pokemon.types[1].type.name],
        inDataBase: false,
    }
}




const infoCleanerDB = (pokemon) => {
    

    return {
        ID: pokemon.ID,
        Nombre: pokemon.Nombre,
        Imagen: pokemon.Imagen,
        Vida: pokemon.Vida,
        Ataque: pokemon.Ataque,
        Defensa: pokemon.Defensa,
        Velocidad: pokemon.Velocidad,
        Altura: pokemon.Altura,
        peso: pokemon.peso,
        type: pokemon.Types.map((element) => element.type).flat(),
    
    inDataBase: pokemon.inDataBase,
    }

}

// *CONTROLLER: Este Helper nos permite traer todos los pokemon exclusivamente de la Base de Datos:
const getFromDatabase = async () => {
    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["Nombre"],
        through: { attributes: [] },
      },
    });
  
    let filtro = dbPokemons.map((item) => infoCleanerDB(item));
    return filtro;
  };


/* 
const getAllPokemons = async () =>{
const pokemonsDB = await Pokemon.findAll()
const inFoApi = (await axios('https://pokeapi.co/api/v2/pokemon/?limit=240')).data

const pokemonsApi = infoCleaner(inFoApi)

return [...pokemonsDB, ...pokemonsApi ]
}

 */


// Traemos todos los pokemon (Api y BDD):
const getAllPokemons = async () => {
    // *Los de la Base de Datos:
    const dataBasePokemons = await getFromDatabase();
    // *Los de la Api:
    const request = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0")
      .then((res) => res.data.results);
    const subRequest = request.map((item) => axios.get(item.url));
    const urls = await axios.all(subRequest);
    const details = urls.map((item) => item.data);
    const apiPokemons = details.map((item) => infoCleaner(item));
  
    return [...dataBasePokemons, ...apiPokemons];
  };
  


/* const getPokemonByName = async (name) =>{
    const inFoApi = await (axios('https://pokeapi.co/api/v2/pokemon/?limit=240')).data

    const pokemonsApi = infoCleanerDB(inFoApi)

    const filteredPokemons = pokemonsApi.filter(pokemon => pokemon.Nombre === name)

    let pokemonDb = await Pokemon.findOne({
		where: { Nombre: name   },
		include: [{ model: Type, attributes: ['Nombre'], through: { attributes: [] } }],
	})

return [...filteredPokemons, ...pokemonDb]

}
 */


const getPokemonByName = async (name) => {
	
	let pokemon = await Pokemon.findOne({
		where: { Nombre: { [Op.iLike]: `%${name}%` } },
		include: [{ model: Type, attributes: ['Nombre'], through: { attributes: [] } }],
	})
	if (pokemon === null) {
		const apiPokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
		if (apiPokemon.data === 'Not Found') return `${name} no encontrado`
		pokemon = infoCleaner(apiPokemon.data)
	}

	return pokemon
}



/* const getPokemonById = async (id, source) =>{

    const pokemons = source === 'api' ? (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data : await 
    Pokemon.findByPk(id)
    return pokemons

}
 */


// Traemos un pokemon por Id desde la Api o la BDD:
const getPokemonById = async (id, source) => {
    if (source === "api") {
      const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = infoCleaner(request.data);
      return pokemon;
    } else {
      const request = await getFromDatabase();
      let filtro = request.filter((item) => item.ID === id);
      return filtro[0];
    } 


  }

/* const createPokemon = async (Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, peso) =>{
    const newPokemon = await Pokemon.create({Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, peso})

    return newPokemon

} */



// Creamos un pokemon en la BDD:
const createPokemon = async ( Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, peso, type) => {

  const newPokemon = await Pokemon.create({Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, peso, type });

 /*   let typeDb = await Type.findAll({ where: { Nombre: type } });
  await newPokemon.addType(typeDb);

  const request = await Pokemon.findOne({
    where: { Nombre: { [Op.iLike]: `%${Nombre}%` } },
    include: {
      model: Type,
      attributes: ["Nombre"],
      through: { attributes: [] },
    },
  });
  let filtro = infoCleanerDB(request);
  return filtro; 
 */

  return newPokemon
  
};



module.exports = {
    createPokemon,
    getPokemonById,
    getAllPokemons,
    getPokemonByName

}


