/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', user => {
        user.increments("id");
        user.string('username', 255).notNullable().unique();
        user.string('password', 255).notNullable();
        user.string('email', 255).notNullable().unique();
      })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
