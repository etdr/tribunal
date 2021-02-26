const Users = require('./Users')
const Individuals = require('./Individuals')
const Titles = require('./Titles')
const Posts = require('./Posts')
const Tribunes = require('./Tribunes')
const Postusages = require('./Postusages')


Users.hasOne(Individuals)
Individuals.belongsTo(Users)

Titles.hasMany(Individuals)
Individuals.belongsTo(Titles)

Individuals.hasMany(Posts)
Posts.belongsTo(Individuals)

Tribunes.belongsToMany(Posts, { through: Postusages })
Posts.belongsToMany(Tribunes, { through: Postusages })



module.exports = {
  Users,
  Individuals,
  Titles,
  Posts,
  Tribunes,
  Postusages
}