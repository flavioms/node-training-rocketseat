const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const {config} = require('dotenv')
const {ok} = require('assert')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "A env é inválida!!")
const configPath = path.join(__dirname, './dotenV', `env.${env}`)
config({ path: configPath })

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..','uploads','resized')));

app.use(require('./routes/routes'));

server.listen(3000);