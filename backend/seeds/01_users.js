/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Luke', last_name: 'Skywalker', username: 'chosenone', password: 'usetheforce'},
    {first_name: 'Leia', last_name: 'Organa', username: 'princess', password: 'hope'},
  ]);
};
