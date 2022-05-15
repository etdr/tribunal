
const Router = require('@koa/router')
const router = new Router({ prefix: '/u' })

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const { Users } = require('../models/index')


router.post('/signup', async (ctx) => {
  try {

    const role = ctx.request.body.user.role

    const pwhash = await argon2.hash(ctx.request.body.user.password, { type: argon2.argon2id })

    const user = await Users.create({
      password: pwhash,
      email: ctx.request.body.user.email,
      role
    })

    // console.log('user created');

    const token = jwt.sign({ id: user.id, admin: role === 'admin' }, process.env.JWT_SECRET, { expiresIn: "21d" })

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

    const user = await Users.findOne({ where: { email: ctx.request.body.user.email } })

    if (user) {

      const matches = await argon2.verify(user.password, ctx.request.body.user.password)

      if (matches) {
      
        const token = jwt.sign({ id: user.id, admin: user.role === 'admin' }, process.env.JWT_SECRET, { expiresIn: "21d" })

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