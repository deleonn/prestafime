'use strict'
const Client = use('App/Models/Client')
const { validateAll } = use("Validator");

class ClientController {
  async index () {
    const clients = await Client.all()

    return clients
  }

  async show ({ params }) {
    const client = await Client.find(params.id)

    return client
  }

  async store ({ request }) {
    const rules = {
      name: 'required',
      email: 'required|email',
      phone_number: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const clientData = request.only(['name', 'phone_number', 'email'])
    const client = await Client.create(clientData)
    return client
  }

  async update ({ params, request }) {
    const client = await Client.find(params.id)

    const rules = {
      name: 'required',
      email: 'required|email',
      phone_number: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    if (client.name != request.input('name')) {
      client.name = request.input('name')
    }

    if (client.email != request.input('email')) {
      client.email = request.input('email')
    }

    if (client.phone_number != request.input("phone_number")) {
      client.phone_number = request.input("phone_number");
    }

    await Client.save()
    return client
  }

  async destroy ({ params }) {
    const client = await Client.find(params.id)

    await client.delete()
  }
}

module.exports = ClientController
