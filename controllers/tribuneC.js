const Router = require('@koa/router')
const router = new Router({ prefix: '/t' })

const { Users, Posts, Tribunes, Cohorts, Individuals, Ranks } = require('../models/index')

router.get('/all', async (ctx) => {
  try {
    ctx.body = await Tribunes.findAll()
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

router.get('/newest/summary', async (ctx) => {
  try {
    ctx.body = await Tribunes.findOne({
      limit: 1,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.get('/newest', async (ctx) => {
  try {
    const tribune = await Tribunes.findOne({
      limit: 1,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {model: Posts, include: [{model: Cohorts, include: [{ model: Individuals, include: Ranks }] }]}
      ]
    })
    ctx.body = tribune
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



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
