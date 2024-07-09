const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')

require("./configs/db")
require("dotenv").config()

const indexRouter = require('./routes/index');
const authUserRouter = require('./routes/authUser');
const linksRouter = require('./routes/links');
const folderRouter = require('./routes/folders');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/auth/users', authUserRouter);
app.use('/folders', folderRouter);
app.use('/links', linksRouter);

const http = require("http")
const server = http.createServer(app)

// server.listen(process.env.PORT || 3000, "192.168.0.101", () => console.log("сервер запущен 8000"))
server.listen(process.env.PORT || 8080, () => console.log("сервер запущен 8000"))   