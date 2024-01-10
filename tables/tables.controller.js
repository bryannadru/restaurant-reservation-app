const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function list(req, res, next) {

    const data = await service.list()
    res.json({ data })
}

async function update(req, res) {
    
}


async function validEntry(req, res, next) {
    const { capacity, people, is_occupied } = req.body // is this the correct way to reference this 

    if (capacity < people) {
        res.status(400).json({ message: 'Number of people exceeds the table capacity.' })
    }
    if (is_occupied === 'true') {
        res.status(400).json({ message: 'Please pick another table, this table is currently occupied.'})
    }
}


module.exports = {
    list: [
        asyncErrorBoundary(validEntry),
        asyncErrorBoundary(list)
    ]
}
