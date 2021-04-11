const dailiesData = require("../seed_data/dailies");

exports.seed = function (knex) {
    return knex("dailies")
        .del()
        .then(() => knex("dailies").insert(dailiesData));
};