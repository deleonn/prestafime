'use strict'
const Loan = use('App/Models/Loan')
const { validateAll } = use("Validator");

class LoanController {
	index() {
		const loans = Loan.query().with('articles').fetch()

		return loans
	}	

	async show({ params }) {
		const loan = await Loan.find(params.id)

		return loan
	}

	async store ({ request }) {
		
	}

	

}

module.exports = LoanController
