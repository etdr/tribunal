const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('individuals', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
})