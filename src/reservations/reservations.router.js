/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
router
    .route("/reservations/new")
    .get(controller.list) // revisit this
    .all(methodNotAllowed)


router.
    route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;
