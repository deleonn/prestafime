'use strict'

const Model = use('Model')

class Inventory extends Model {
  article() {
    return this.belongsTo("App/Models/Article");
  }
}

module.exports = Inventory
