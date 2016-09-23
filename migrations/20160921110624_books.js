exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', function(table) {
        table.increments().primary();
        table.string('title');
        table.string('genre');
        table.text('description');
        table.string('cover');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('book');
};
