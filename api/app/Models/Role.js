'use strict'

const Model = use('Model')

class Role extends Model {

  user () {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Role
