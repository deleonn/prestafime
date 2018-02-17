'use strict'

const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('title', 60)
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
