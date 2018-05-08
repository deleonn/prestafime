'use strict'

const Model = use('Model')

class Article extends Model {
    loans(){
        return this.belongsToMany('App/Models/Loan').pivotTable('article_loans')
    }
}

module.exports = Article
