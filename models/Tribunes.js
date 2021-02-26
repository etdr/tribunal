const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('tribunes', {

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },

  intro: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  outro: {
    type: DataTypes.TEXT,
    allowNull: true
  }

})