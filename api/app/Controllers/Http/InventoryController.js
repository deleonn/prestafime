'use strict'

const Inventory = use('App/Models/Inventory')
const { validateAll } = use('Validator')

class InventoryController {
	index(){
		const inventorys = Inventory.query().fetch()

		return inventorys
	}

	show({ params }){
		const inventorys = Inventory.find(params.id)

		return inventorys
	}

	async store({ request }){
		const rules ={
			article_id: 'required',
			stock:'required',
			input: 'required',
			output: 'required',
			existence: 'required'
		}

		const validation = await validateAll(request.all(), rules)
		
		if(validation.fails()){
			return validation.messages()
		}

		const inventorydata = request.only(['article_id','stock','input','output','existence'])
		const inventory = await Inventory.create(inventorydata)
		return inventory
	}

	async update({ params,request }){
		const inventory = await Inventory.find(params.id)

		const rules ={
			article_id: 'required',
			stock:'required',
			input: 'required',
			output: 'required',
			existence: 'required'
		}

		const validation = await validateAll(request.all(), rules)
		
		if(validation.fails()){
			return validation.messages()
		}

		if(inventory.stock != request.input('stock')){
			inventory.stock = request.input('stock')
		}

		if(inventory.input != request.input('input')){
			inventory.input = request.input('input')
		}

		if(inventory.output != request.input('output')){
			inventory.output = request.input('output')
		}

		if(inventory.existence != request.input('existence')){
			inventory.existence = request.input('existence')
		}
	}

	async destroy({ params }){
		const inventory = await Inventory.find(params.id)

		await inventory.delete()
	}
}

module.exports = InventoryController
