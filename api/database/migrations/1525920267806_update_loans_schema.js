'use strict'

const Schema = use('Schema')

class UpdateLoansSchema extends Schema {
  up () {
    this.table('loans', (table) => {
      table.boolean('active').nullable()
    })
  }

  down () {
    this.table('loans', (table) => {
      table.dropColumn('active')
    })
  }
}

module.exports = UpdateLoansSchema
