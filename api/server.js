const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const authRouter = require('./auth-router')
const itemRouter = require('./item-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter)
server.use('/api/item', itemRouter);

server.get("/",(req, res) =>{
    res.json({"Server is up"})
})
module.exports = server;