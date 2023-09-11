
const {
    getAllPokemons,
    getPokemonByName,
    getPokemonById,
    createPokemon, 
  
} = require('../controllers/pokeControllers')





const getPokemonsHandler = async (req, res) =>{
    
    const { name } = req.query
	try {
		const response = name ? await getPokemonByName(name) : await getAllPokemons()
		return res.status(200).json(response)
	} catch (error) {
		return res.status(400).json({ error: error.message })
	}
    }




const getPokemonByIdHandler = async (req, res) =>{

	try {
        const { id } = req.params


        const source = isNaN(id) ? 'bdd' : 'api'
        
        
        const response = await getPokemonById(id, source)
		return res.status(200).send(response)
	} catch (error) {
		
		return res.status(400).json({ error: error.message })
	}
      }
    


const postPokemonHandler = async (req, res) =>{
    const { Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, peso, type} = req.body
    try {
        
        const newPokemon = await createPokemon(
            Nombre, 
            Imagen, 
            Vida, 
            Ataque, 
            Defensa, 
            Velocidad, 
            Altura, 
            peso,
            type,
            
            )
        return res.status(200).json(newPokemon)
    } catch (error) {
        return res.status(400).json('Ocurio un error')
    }
}







  module.exports = {

    getAllPokemons,
    getPokemonByIdHandler,
    getPokemonsHandler,
    postPokemonHandler,

}
