require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const bp = require('koa-bodyparser');
const jwt = require('koa-jwt');

const cs = require('./controllers/index')

const app = new Koa();

const seq = require('./db');
// seq.sync({alter: true});
//seq.sync({force:true});

app.use(cors())

app.use(bp())


app.use(cs.userC.routes()).use(cs.userC.allowedMethods())

app.use(jwt({ secret: process.env.JWT_SECRET }))

app.use(cs.postC.routes()).use(cs.postC.allowedMethods())
app.use(cs.tribuneC.routes()).use(cs.tribuneC.allowedMethods())
app.use(cs.individualC.routes()).use(cs.individualC.allowedMethods())
app.use(cs.cohortC.routes()).use(cs.cohortC.allowedMethods())
app.use(cs.rankC.routes()).use(cs.rankC.allowedMethods())


seq.authenticate()
  // .then(() => seq.sync({force: true}))
  .then(() => seq.sync())
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${process.env.PORT}`)
    }))
  .catch(() => console.error('not connected to postgres'));