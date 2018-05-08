'use strict'

const Model = use('Model')

class Loan extends Model {
    articles(){
        return this.belongsToMany('App/Models/Article').pivotTable('article_loans')
    }
}

module.exports = Loan
