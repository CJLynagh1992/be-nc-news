exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('author')
      .references('users.username')
      .notNullable();
    commentsTable.integer('article_id').references('articles.article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(connection.fn.now());
    commentsTable.text('body').notNullable();
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('comments');
};
