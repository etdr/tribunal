
const Router = require('@koa/router')
const router = new Router({ prefix: '/u' })

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const { Users } = require('../models/index')


router.post('/signup', async (ctx) => {
  try {
    console.log(ctx.request.body)

    const admin = ctx.request.body.user.admin

    const pwhash = await argon2.hash(ctx.request.body.user.password, { type: argon2.argon2id })

    const user = await Users.create({
      username: ctx.request.body.user.username,
      password: pwhash,
      firstname: ctx.request.body.user.firstname,
      lastname: ctx.request.body.user.lastname,
      email: ctx.request.body.user.email,
      title: ctx.request.body.user.title,
      description: ctx.request.body.user.description,
      color: ctx.request.body.user.color,
      admin
    })

    // console.log('user created');

    const token = jwt.sign({ id: user.id, admin }, process.env.JWT_SECRET, { expiresIn: "21d" })

    // console.log('sending response');

    ctx.body = {
      user,
      token
    }

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})


router.post('/login', async (ctx) => {
  try {
    const user = await Users.findOne({ where: { username: ctx.request.body.user.username } })

    if (user) {

      const matches = await argon2.verify(user.password, ctx.request.body.user.password)

      if (matches) {
      
        const token = jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET, { expiresIn: "21d" })

        ctx.body = {
          user,
          token
        }

      } else {
        ctx.status = 502
        ctx.body = { error: 'password mismatch' }
      }

    } else {
      ctx.status = 500
      ctx.body = { error: 'no user found' }
    }


  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})



module.exports = router