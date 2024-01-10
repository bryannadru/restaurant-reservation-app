
const knex = require('../db/connection')

// have a tables service file, don't think i need a dashboard service file 
function list() {
    return knex("tables")
    .select("*")
    .groupBy("table_name")
}






module.exports = {
    list,
}