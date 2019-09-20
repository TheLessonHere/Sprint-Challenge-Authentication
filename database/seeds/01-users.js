
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Levi',
          password: 'abcd1234'
        },
        {
          username: 'Quavo',
          password: 'Quavo'
        }
      ]);
    });
};
