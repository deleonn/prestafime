'use strict'

const Schema = use('Schema')

class LoanSchema extends Schema {
  up () {
    this.create('loans', (table) => {
      table.increments()
      table.timestamps()
      table.integer('client_id').unsigned().notNullable()
      table.foreign('client_id').references('id').inTable('clients')
    })
  }

  down () {
    this.drop('loans')
  }
}

module.exports = LoanSchema
