exports.up = function (knex, Promise) {
  return knex.schema.hasTable("usuarios").then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable("usuarios", (table) => {
          table.increments("id").primary();
          table.string("nome").notNull();
          table.string("email").notNull().unique();
          table.string("senha", 60).notNull();
          table.boolean("ativo").notNull().defaultTo(true);
          table.timestamp("data_criacao").defaultTo(knex.fn.now());
        })
        .then(console.log("created user table"));
    }
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("usuarios");
};
