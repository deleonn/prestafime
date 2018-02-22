'use strict'

const Model = use('Model')

class Role extends Model {

  static get createdAtColumn() {
    return false
  }

  static get updatedAtColumn() {
    return false
  }

  user() {
    return this.hasOne("App/Models/User");
  }
}

module.exports = Role
