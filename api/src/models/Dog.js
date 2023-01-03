const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {  //altura
      type: DataTypes.ARRAY(DataTypes.STRING),//al enviar los datos por medio del body se hace con un array
      allowNull: false
    },
    weight: {  //peso
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    life_span: { //esperanza de vida
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(5000),
    }
  });
};
