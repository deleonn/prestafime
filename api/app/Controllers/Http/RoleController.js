'use strict'
const Role = use('App/Models/Role')
const { validateAll } = use ('Validator')

class RoleController {
  async index () {
    const roles = await Role.all()

    return roles
  }

  show ({ params }) {
    const role = Role.find(params.id)

    return role
  }

  async store ({ request }) {
    const rules = {
      title: "required",
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const roleData = request.only([
      "title",
    ])

    const role = await Role.create(roleData)
    return role
  }

  async update ({ params, request }) {
    const role = await Role.find(params.id)

    const rules = {
      title: "required",
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    if (role.title != request.input("title")) {
      role.title = request.input("title")
    }

    await role.save()
    return role
  }

  async destroy ({ params }) {
    const role = await Role.find(params.id)

    await role.delete()
  }
}

module.exports = RoleController
