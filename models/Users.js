const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['user', 'mod', 'admin']]
    }
  }
})