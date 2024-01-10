const knex = require('../db/connection')


// list all reservations 
function list() {
    return knex('reservations')
    .select('*')
}


// list all reservations by DATE 
function listReservationsByDate(reservationDate) {
    return knex('reservations as r')
    .select('*')
    .where({ 'r.reservation_date' : reservationDate })
}


module.exports = {
    read,
    list,
    listReservationsByDate,
}