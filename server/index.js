require("dotenv").config();
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const compression = require('compression')

const { todosRouter } = require('./todos')
const validator = require('validatorjs')

const app = express()

const users = []

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json(({ message: 'Unauthorized' }));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json(({ message: 'Token has expired' }));
        req.user = user;
        next();
    });
}

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

app.use(cors())

app.use(loggerMiddleware);

app.use(compression())

app.use('/todos', authenticateToken, todosRouter)

app.use(express.json())

app.get('/', (req, res) => {
    res.send({ hello: 'world' })
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const thisValidator = new validator({ username: username, password: password }, { username: 'required|email|max:150', password: 'required|min:8|max:12' })

    if (thisValidator.fails()) {
        const fieldErrors = {};

        /* eslint-disable */
        for (const key in thisValidator.errors.errors) {
            fieldErrors[key] = thisValidator.errors.errors[key][0];
        }
        res.status(400).json({ fieldErrors })
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.json({ message: "User successfully registered" });
    }

});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const thisValidator = new validator({ username: username, password: password }, { username: 'required|email|max:150', password: 'required|min:8|max:12' })

    if (thisValidator.fails()) {
        const fieldErrors = {};

        /* eslint-disable */
        for (const key in thisValidator.errors.errors) {
            fieldErrors[key] = thisValidator.errors.errors[key][0];
        }
        res.status(400).json({ fieldErrors })
    }
    else {
        const user = users.find(u => u.username === username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials or user not found" });
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    }


});

app.listen(3333, () => {
    console.log('server running at port 3333')
})