/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const categoriesJSON = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')).json();
    const categoriesInsert = categoriesJSON.meals.map((el) => ({
      title: el.strCategory, createdAt: new Date(), updatedAt: new Date(),
    }));

    const coutnriesJSON = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')).json();
    const coutnriesInsert = coutnriesJSON.meals.map((el) => ({
      name: el.strArea, createdAt: new Date(), updatedAt: new Date(),
    }));

    const ingredientsJSON = await (await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')).json();
    const ingredientsInsert = ingredientsJSON.meals.map((el) => ({
      name: el.strIngredient, createdAt: new Date(), updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Categories', categoriesInsert, {});
    await queryInterface.bulkInsert('Countries', coutnriesInsert, {});
    await queryInterface.bulkInsert('Ingredients', ingredientsInsert, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
