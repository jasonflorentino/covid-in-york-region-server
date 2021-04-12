const knexConfig = require('../knexConfig');
const knex = require('knex')(knexConfig);

module.exports = {
    getAll,
};

async function getAll() {
    return await knex.select().table('dailies')
}