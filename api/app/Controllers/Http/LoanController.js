'use strict'
const Loan = use('App/Models/Loan')
const { validateAll } = use("Validator");

class LoanController {
  async index ({ request }) {
    const query = request.get()
    const loans = await Loan.query().with('client').with('articles').paginate(query.page, 10)

    return loans
  }

    async unpaginated ({ request }) {
    const query = request.get()
    const loans = await Loan.query().fetch()

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

    const loanData = request.only(['client_id'])
    const article = request.only(['article_id'])

    const loan = await Loan.create(loanData)

    await loan.articles().attach([article.article_id, loan.id])

		return loan
	}



}

module.exports = LoanController
