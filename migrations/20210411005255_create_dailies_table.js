
exports.up = function(knex) {
  return knex.schema.createTable("dailies", (table) => {
    table.increments("id").primary();
    table.timestamp("date").defaultTo(knex.fn.now());
    table.integer("resolved").unsigned().notNullable();
    table.integer("deceased").unsigned().notNullable();
    table.integer("self_isolating").unsigned().notNullable();
    table.integer("hospitalized").unsigned().notNullable();
    table.integer("hospitalized_icu").unsigned().notNullable();
    table.integer("total").unsigned().notNullable();
    table.integer("total_active").unsigned().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("dailies");  
};
