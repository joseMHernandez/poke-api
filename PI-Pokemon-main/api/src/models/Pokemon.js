const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {

ID: {
  type: DataTypes.UUID,
  defaultValue: UUIDV4,
  allowNull: false,
  primaryKey: true
},

Nombre: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
},

Imagen: {
  type: DataTypes.STRING,
  allowNull: false
},

Vida: {
  type: DataTypes.INTEGER,
  allowNull: false
},

Ataque: {
  type: DataTypes.INTEGER,
  allowNull: false,
},

Defensa : {
  type: DataTypes.INTEGER,
  allowNull: false
},

Velocidad: {
  type: DataTypes.STRING,
},

Altura: {
  type: DataTypes.STRING
},


peso: {
  type: DataTypes.STRING
},


type: {
  type: DataTypes.ARRAY(DataTypes.STRING),
},


inDataBase: {
  type: DataTypes.BOOLEAN,
  defaultValue: true,
},

},

{
  timestamps: false,
}
 )
}
