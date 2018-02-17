'use strict'

const User = use('App/Models/User')

class UserController {
  index () {
    const users = User.query().with('role').fetch()

    return users
  }

  show ({ params }) {
    const user = User.find(params.id)

    return user
  }

  store () {

  }
  
  update () {

  }

  destroy () {

  }
}

module.exports = UserController
