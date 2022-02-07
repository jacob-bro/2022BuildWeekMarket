/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', item => {
        item.increments('id');
        item.string('item_name', 255).notNullable();
        item.string('location', 255).notNullable();
        item.integer('quantity').unsigned().notNullable();
        item.float('price').notNullable();
        item.text("description").notNullable();
        item.integer("user_id").unsigned().references("id").inTable("user")
      });
    };
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('item')
};
