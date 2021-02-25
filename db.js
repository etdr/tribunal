const { Sequelize } = require('sequelize')

const seq = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
})

seq.authenticate()
  .then(() => console.log('connected to postgres'))
  .catch(() => console.error('not connected to postgres'));


module.exports = seq;
