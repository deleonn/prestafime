'use strict'
const Loan = use('App/Models/Loan')
const { validateAll } = use("Validator");

class LoanController {
  async index ({ request }) {
    const query = request.get()
    const loans = await Loan.query().with('client').with('articles').where('active', 1).paginate(query.page, 10)

    return loans
  }

    async unpaginated ({ request }) {
    const query = request.get()
    const loans = await Loan.query().where('active', 1).fetch()

    return loans
  }

	async show({ params }) {
		const loan = await Loan.find(params.id)

		return loan
	}

	async store ({ request }) {
    const rules ={
			article_id: 'required',
			client_id:'required'
		}

		const validation = await validateAll(request.all(), rules)

		if(validation.fails()){
			return response.status(401).json(validation.messages())
    }

    const client = request.only(['client_id'])

    const loan = new Loan()
    loan.client_id = client.client_id
    loan.active = 1

    await loan.save()

    const article = request.only(['article_id'])

    await loan.articles().attach([article.article_id, loan.id])

		return loan
  }

  async completeLoan ({ request, response }) {
    const rules = {
      id: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      return response.status(401).json(validation.messages())
    }

    const loan = await Loan.find(request.input('id'))

    loan.active = 0

    await loan.save()

    return loan

  }



}

module.exports = LoanController
