const { Sequelize } = require('sequelize')

const seq = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
})

module.exports = seq;
