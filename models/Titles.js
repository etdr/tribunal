const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('titles', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
})