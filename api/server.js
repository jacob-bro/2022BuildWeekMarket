const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const { restricted } = require("../api/middleware.js")

const authRouter = require('./auth-router')
const itemRouter = require('./item-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter)
server.use('/api/item', restricted, itemRouter);

module.exports = server;