'use strict'

const Model = use('Model')

class Loan extends Model {
    articles () {
        return this.belongsToMany('App/Models/Article').pivotTable('article_loans')
    }

    client () {
      return this.belongsTo('App/Models/Client')
    }
}

module.exports = Loan
