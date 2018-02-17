'use strict'

const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.integer('article_id').unsigned().notNullable()
      table.foreign('article_id').references('id').inTable('articles')
      table.integer('stock', 5)
      table.integer('input', 5)
      table.integer('output', 5)
      table.integer('existence', 5)
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
