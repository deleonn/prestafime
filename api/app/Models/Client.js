'use strict'

const Model = use('Model')

class Client extends Model {

  loan() {
    return this.hasOne('App/Models/Loan')
  }

}

module.exports = Client
