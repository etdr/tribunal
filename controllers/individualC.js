const Router = require('@koa/router')
const router = new Router({ prefix: '/i' })

const { Users, Individuals, Cohorts } = require('../models/index')


router.get('/all', async (ctx) => {
  try {
    ctx.body = await Individuals.findAll()
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

// get by rank
router.get('/r/:rid', async (ctx) => {
  try {
    ctx.body = await Individuals.findAll({ where: {rankId: ctx.params.rid} })
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

// get by cohort
router.get('/c/:cid', async (ctx) => {
  try {
    ctx.body = await Individuals.findAll({ where: {cohortId: ctx.params.cid} })
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



router.post('/', async (ctx) => {
  try {
    const individual = ctx.request.body.individual

    const result = await Individuals.create({
      firstname: individual.firstname,
      lastname: individual.lastname,
      rankId: ctx.request.body.rankId,
      cohortId: ctx.request.body.cohortId,
      userId: ctx.request.body.userId
    })

    ctx.body = result

  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.link('/:iid/u/:uid', async (ctx) => {
  try {
    const user = await Users.findOne({where: {id: ctx.params.uid}})
    ctx.body = await user.setIndividual(parseInt(ctx.params.iid))
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

router.unlink('/:iid/u', async (ctx) => {
  try {
    const individual = await Individuals.findOne({where: {id: ctx.params.iid}})
    ctx.body = await individual.setUser(null)
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.link('/:iid/c/:cid', async (ctx) => {
  try {
    const cohort = await Cohorts.findOne({where: {id: ctx.params.cid}})
    const result = await cohort.addIndividual(parseInt(ctx.params.iid))
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

router.unlink('/:iid/c', async (ctx) => {
  try {
    const individual = await Individuals.findOne({where: {id: ctx.params.iid}})
    const result = await individual.setCohort(null)
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.link('/:iid/r/:rid', async (ctx) => {
  try {
    const individual = await Individuals.findOne({where: {id: ctx.params.iid}})
    ctx.body = await individual.setRank(parseInt(ctx.params.rid))
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})

router.unlink('/:iid/r', async (ctx) => {
  try {
    const individual = await Individuals.findOne({where: {id: ctx.params.iid}})
    ctx.body = await individual.setRank(null)
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



module.exports = router