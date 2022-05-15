const db = require('../db')
const { DataTypes } = require('sequelize')

module.exports = db.define('cohorts', {
  program: {
    type: DataTypes.ENUM('wd', 'sd', 'cy', 'ux', 'py'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})