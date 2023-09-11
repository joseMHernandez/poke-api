

const axios = require("axios");

const getAllTypes = async () => {
	const allArray = (await axios.get("https://pokeapi.co/api/v2/type")).data;
	const allTypesArray = allArray.results.map((e) => e.name);
	console.log(allTypesArray);
	// const createdTypes = await Type.bulkCreate(allTypesArray.map(name=>({name})));
	// return createdTypes;
	return allTypesArray;
  };
  

  module.exports ={
	getAllTypes
  }