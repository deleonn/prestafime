'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  index () {
    const users = User.query().with('role').fetch()

    return users
  }

  show ({ params }) {
    const user = User.find(params.id)

    return user
  }

  async store ({ request }) {
    const rules = {
      name: 'required',
      username: 'required',
      email: 'required|email|unique:users,email',
      password: 'required',
      role_id: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const userData = request.only(['name', 'username', 'email', 'role_id', 'password'])
    const user = await User.create(userData)
    return user
  }

  async update ({ params, request }) {
    const user = await User.find(params.id)

    const rules = {
      name: 'required',
      username: 'required',
      email: 'required|email|unique:users,email,id,'+params.id,
      password: 'string',
      role_id: 'integer'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    if (user.name != request.input('name')) {
      user.name = request.input('name')
    }

    if (user.email != request.input('email')) {
      user.email = request.input('email')
    }

    if (user.password != '') {
      user.password = request.input('password')
    }

    if (user.username != request.input('username')) {
      user.username = request.input('username')
    }

    if (request.input('role_id')) {
      user.role_id = request.input('role_id')
    }

    await user.save()
    return user
  }

  async destroy ({ params }) {
    const user = await User.find(params.id)

    await user.delete()
  }
}

module.exports = UserController
