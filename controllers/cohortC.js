const Router = require('@koa/router')
const router = new Router({ prefix: '/c' })

const { Users, Cohorts, Individuals, Ranks } = require('../models/index')


router.get('/all', async (ctx) => {
  try {
    ctx.body = await Cohorts.findAll({
      // ctx.query.include?.includes('i') ? {include: Individuals} : {}
      where: ctx.query.active === 'true' ? { archived: false } : null,
      include: ctx.query.include?.includes('i') ? [Individuals] : []
    })
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



router.post('/', async (ctx) => {
  try {
    const cohort = ctx.request.body.cohort

    const result = await Cohorts.create({
      program: cohort.program,
      name: cohort.name,
      startDate: cohort.startDate
    })

    ctx.body = result

  } catch (err) {
    ctx.status = 500
    ctx.body = err.message
  }
})



router.put('/:cid/archive', async (ctx) => {
  try {
    ctx.body = await Cohorts.update({
      archived: true
    }, {
      where: { id: ctx.params.cid }
    })
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



module.exports = router
