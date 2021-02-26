const Router = require('@koa/router')
const router = new Router({ prefix: '/p' })

const { Posts, Tribunes } = require('../models/index')



router.get('/all', async ctx => {
  try {
    ctx.body = await Posts.findAll()

  } catch (e) {
    ctx.status = 500
    ctx.body = `error: ${e.message}`
  }
})

router.get('/t/:tid', async ctx => {
  try {
    const trib = await Tribunes.findOne({
      where: { id: ctx.params.tid },
      include: Posts
    })
  
    ctx.body = trib.posts
  
  } catch (e) {
    ctx.status = 500
    ctx.body = `error: ${e.message}`
  }
})

router.get('/:id', async ctx => {
  try {
    ctx.body = await Posts.findOne({
      where: { id: ctx.params.id }
    })
  
  } catch (e) {
    ctx.status = 500
    ctx.body = `error: ${e.message}`
  }
})



router.post('/', async ctx => {
  try {
    const result = await Posts.create({
      date: ctx.body.post.date,
      title: ctx.body.post.title,
      body: ctx.body.post.body,
      emoji: ctx.body.post.emoji
    })

    // attach to tribunes?

    ctx.body = result
  
  } catch (e) {
    ctx.status = 500
    ctx.body = `error: ${e.message}`
  }
})


router.put('/:pid')


router.link('/:pid/t/:tid', async ctx => {
  
})



router.unlink('/:pid/t/:tid')