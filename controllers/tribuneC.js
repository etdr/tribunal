const Router = require('@koa/router')
const router = new Router({ prefix: '/t' })

const { Users, Posts, Tribunes, Cohorts } = require('../models/index')


router.get('/:tid', async (ctx) => {
  try {
    const tribune = await Tribunes.findOne({
      where: {id: ctx.params.tid},
      include: [
        {model: Posts, include: Cohorts}
      ]
    })

    ctx.body = tribune

  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.post('/', async (ctx) => {
  try {
    const tribune = ctx.request.body.tribune

    const result = await Tribunes.create(tribune)

    ctx.body = result

  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})




module.exports = router
