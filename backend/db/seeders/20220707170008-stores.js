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
    {
      recipe_id: 5,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 6,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 7,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 8,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 9,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 10,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 11,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 12,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 13,
      amount: 2,
      standart: 10,
      plan: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 14,
      amount: 7,
      standart: 10,
      plan: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 15,
      amount: 5,
      standart: 8,
      plan: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 16,
      amount: 1,
      standart: 12,
      plan: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 17,
      amount: 2,
      standart: 8,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 18,
      amount: 0,
      standart: 10,
      plan: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 19,
      amount: 4,
      standart: 10,
      plan: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipe_id: 20,
      amount: 8,
      standart: 8,
      plan: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  },
};
