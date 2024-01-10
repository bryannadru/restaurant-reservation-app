const moment = require('moment')
const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const { reset } = require('nodemon')

/**
 * List handler for reservation resources
 */
/* async function list(req, res) {
  res.json({
    data: [],
  });s
} */

// check to see if new reservation has valid properties 
function bodyDataHas(propertyName) {
  return function(req, res, next) {
    const { data = {} } = req.body
    if (data[propertyName]) {
      return next()
    }
    next ({
      status: 400,
      message: `Reservation must include a ${propertyName}`
    })
  }
} 

// is the reservation date a tuesday  --> done, double check 
// here see if we need to make use of moment() instead of UTC
async function isTuesday(req, res, next) {
  const reservationDate = req.query.reservation_date
  if (reservationDate) {
    const date = new Date(reservationDate)
    let day = date.getUTCDay()
    // gets the day of reservationDate from query 
    if (day === 2) {
      // if the day equals 2 return error 
    res.status(400).json({ message: 'Restaurant is closed Tuesdays.' })
    } 
  }
    return next()
}


// done --> double check 
async function invalidDate(req, res, next) {
  let currentDate = moment().startOf('day');
  let reservationDate = moment(req.query.reservation_date)

  if (!reservationDate.isValid()) {
    return res.status(400).json({ message: 'Invalid date format. Please use a valid date.' });
  }
  if (reservationDate.isBefore(currentDate)) {
    return res.status(400).json({ message: `The date cannot be in the past. Please change ${reservationDate.format('MMMM Do YYYY')} to a valid upcoming date.` });
  }
  return next()
}

// done --> double check this 
async function validTime(req, res, next) {
  const afterOpen = moment().set({'hour' : 10, 'minute': 30 })
  const afterClose = moment().set({ 'hour': 21, 'minute': 30 })
  const currentTime = moment(req.query.reservation_time) // is this correct for the present time 

  let reservationTime = moment(req.query.reservation_time)
  if (reservationTime.isBefore(afterOpen) || reservationTime.isAfter(afterClose)) {
    res.status(400).json({ message: `The restaurant opens at 10:30AM and closes at 9:30 PM. You reservation time is invalid ${reservationTime}` })
  }
  if (reservationTime.isBefore(currentTime)) {
    res.status(400).json({ message: `Time ${reservationTime} is invalid. Please select a new time.` })
  }
  next()
}


// lists the reservations by date --> done, double check 
async function list(req, res ,next) {

  const date = req.query.reservation_date
  if (date) {
    res.json({ data: await service.listReservationsByDate() })
  } else {
    res.json({ data: await service.list()})
  }
}

// add all middleware to exports 
module.exports = {
  list: [
  asyncErrorBoundary(isTuesday),
  asyncErrorBoundary(invalidDate),
  asyncErrorBoundary(validTime),
  asyncErrorBoundary(list),
  ],
};
