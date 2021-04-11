const Users = require('./Users')
const Individuals = require('./Individuals')
const Ranks = require('./Ranks')
const Posts = require('./Posts')
const Tribunes = require('./Tribunes')
// const Postusages = require('./Postusages')
const Cohorts = require('./Cohorts')


Users.hasOne(Individuals)
Individuals.belongsTo(Users)

Ranks.hasMany(Individuals)
Individuals.belongsTo(Ranks)

Cohorts.hasMany(Individuals)
Individuals.belongsTo(Cohorts)

// Individuals.hasMany(Posts)
// Posts.belongsTo(Individuals)

Tribunes.hasMany(Posts)
Posts.belongsTo(Tribunes)

// EVENTUALLY:
// Tribunes.belongsToMany(Posts, { through: Postusages })
// Posts.belongsToMany(Tribunes, { through: Postusages })

Cohorts.hasMany(Posts)
Posts.belongsTo(Cohorts)


module.exports = {
  Users,
  Individuals,
  Ranks,
  Posts,
  Tribunes,
  Cohorts
}