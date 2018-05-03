'use strict'

const Inventory = use('App/Models/Inventory')
const { validateAll } = use('Validator')

class InventoryController {
	async index({ request }){
    const query = request.get()
		const inventory = await Inventory.query().with('article').paginate(query.page, 10)

		return inventory
	}

	show({ params }){
		const inventory = Inventory.find(params.id)

		return inventory
	}

	async store({ request, response }){
		const rules ={
			article_id: 'required',
			stock:'required'
		}

		const validation = await validateAll(request.all(), rules)

		if(validation.fails()){
			return response.status(401).json(validation.messages())
		}

		const inventorydata = request.only(['article_id','stock'])
		const inventory = await Inventory.create(inventorydata)
		return inventory
	}

	async update({ params, request, response }){
		const inventory = await Inventory.find(params.id)

		const rules ={
			article_id: 'required',
			stock:'required'
		}

		const validation = await validateAll(request.all(), rules)

		if(validation.fails()){
			return response.status(401).json(validation.messages())
		}

		if(inventory.stock != request.input('stock')){
			inventory.stock = request.input('stock')
		}
	}

	async destroy({ params }){
		const inventory = await Inventory.find(params.id)

		await inventory.delete()
	}
}

module.exports = InventoryController
