const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('ranks', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rank: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[0, 1, 2, 3, 4, 5]]
    }
  }
})