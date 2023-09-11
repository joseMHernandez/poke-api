const {DataTypes} = require('sequelize')

module.exports = (sequilize) =>{
    sequilize.define( 'Type', 
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            timestamps: false,
        }
    
    )
}