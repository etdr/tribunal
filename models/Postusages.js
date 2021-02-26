const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('tribunes', {
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})