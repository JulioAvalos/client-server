import path from "path";

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.port || 5000;

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/item', require('./routes/item'));
app.use('/client', require('./routes/client'));
app.use('/auth', require('./routes/auth'));

app.listen(port);

console.log(`Cel Client's Server v1.0.0 - Port: ${port}`);

module.exports = app;
