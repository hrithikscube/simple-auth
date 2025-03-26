const express = require('express')

const todosRouter = express.Router()

const list_of_todos = [
    {
        id: 1,
        title: "Buy Groceries",
        description: "Purchase vegetables, fruits, and dairy products."
    },
    {
        id: 2,
        title: "Complete Project Report",
        description: "Finish the final draft and submit it by evening."
    },
    {
        id: 3,
        title: "Workout Session",
        description: "Attend the gym for an hour of strength training."
    },
    {
        id: 4,
        title: "Read a Book",
        description: "Read at least 30 pages of a novel."
    },
    {
        id: 5,
        title: "Call a Friend",
        description: "Catch up with an old friend over a phone call."
    }
];


todosRouter.get('/', (req, res) => {
    res.status(200).json({
        data: list_of_todos
    })
})

module.exports = { todosRouter }