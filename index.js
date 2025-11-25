const express = require('express');
const app = express();
const {Pool} = require('pg');
const pool = new Pool({host: 'localhost', database: 'pgLearn', user: 'postgres', password: '2255', port: 5432});
pool.connect().then(() => {
    console.log('connected');
}).catch((err) => {
    console.log(err);
});
app.use(express.json());
