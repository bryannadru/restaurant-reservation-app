const knex = require("../db/connection")



function list() {
    return knex("tables as t")
    .join("reservations as r", "r.reservation_id", "t.reservation_id")
    .select("t*", "r*") // look over this 
    /*.select("table_id", "table_name", "is_occupied")
    .orderBy("table_name"); */
    .where({ "t.is_occupied" : false })
    .orderBy("table_name")
}

module.exports = {
    list,
}