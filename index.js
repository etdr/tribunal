require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bp = require('koa-bodyparser');
const jwt = require('koa-jwt');

const app = new Koa();


const seq = require('./db');
seq.sync({alter: true});
//seq.sync({force:true});


app.use(cors())

app.use(bp())



app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`)
})