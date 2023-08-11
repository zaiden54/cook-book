const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Ingredient }) {
      this.belongsToMany(User, { through: 'RecipeUsers', foreignKey: 'recipeId', as: 'likedBy' });
      this.belongsToMany(Ingredient, { through: 'RecipeIngredients', foreignKey: 'recipeId' });
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    idMeal: DataTypes.STRING,
    catId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};
