module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', [{
      recipe_id: 1,
      amount: 5,
      standart: 20,
      plan: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 2,
      amount: 4,
      standart: 8,
      plan: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 3,
      amount: 0,
      standart: 8,
      plan: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 4,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  },
};
