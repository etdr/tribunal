const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('posts', {
  
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  emoji: {
    type: DataTypes.STRING(8),
    allowNull: true
  }
})