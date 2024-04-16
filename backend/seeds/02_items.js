/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {user_id: 1, item_name: 'Lightsaber', description: 'An elegant weapons', quantity: 10},
    {user_id: 2, item_name: 'Blaster', description: 'A more civilized weapon', quantity: 20},
  ]);
};
