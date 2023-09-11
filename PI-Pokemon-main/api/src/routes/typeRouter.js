const { Router } = require("express");
const {pokemonsTypesHandler} = require("../handlers/typesHandlers");

const typeRouter = Router();

// ?Acá está definidas la ruta de types:
typeRouter.get("/", pokemonsTypesHandler);

module.exports = typeRouter;
