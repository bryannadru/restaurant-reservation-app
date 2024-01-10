const router = require("express").Router()
const controller = require("./tables.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router 
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed)

router 
    .route("/new")
    .put(controller.update)

router
    .route("/:table_id/seat")
    .post(controller.create)
    .put(controller.update)
    .all(methodNotAllowed)

module.exports = router;