const Router = require('@koa/router')
const router = new Router({ prefix: '/r' })

const { Users, Individuals, Ranks } = require('../models/index')


router.get('/all', async (ctx) => {
  try {
    const ranks = await Ranks.findAll()

    ctx.body = ranks
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})


router.post('/', async (ctx) => {
  try {
    const rank = ctx.request.body.rank

    const result = await Ranks.create({
      title: rank.title,
      rank: rank.rank
    })
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})



router.delete('/:rid', async (ctx) => {
  try {
    const result = await Ranks.destroy({
      where: { id: ctx.params.rid }
    })
    ctx.body = result
  } catch (err) {
    ctx.status = 500
    ctx.body = `error: ${err.message}`
  }
})




module.exports = router