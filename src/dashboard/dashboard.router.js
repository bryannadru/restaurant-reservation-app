const router = require('express').Router()
const controller = require('./dashboard.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

router  
    .route("/dashboard")
    .get(controller.list)
    .all(methodNotAllowed)

    

