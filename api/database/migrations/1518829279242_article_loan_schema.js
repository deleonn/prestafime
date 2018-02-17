'use strict'

const Schema = use('Schema')

class ArticleLoanSchema extends Schema {
  up () {
    this.create('article_loans', (table) => {
      table.increments()
      table.integer('article_id').unsigned().notNullable()
      table.foreign('article_id').references('id').inTable('articles')
      table.integer('loan_id').unsigned().notNullable()
      table.foreign('loan_id').references('id').inTable('loans')
    })
  }

  down () {
    this.drop('article_loans')
  }
}

module.exports = ArticleLoanSchema
