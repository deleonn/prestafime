'use strict'

const Article = use('App/Models/Article')
const { validateAll } = use('Validator')

class ArticleController {
	index(){
		const articles = Article.query().fetch()

		return articles
	}

	show({ params }){
		const article = Article.find(params.id)

		return article
	}

	async store({ request }){
		const rules ={
			name: 'required',
			description: 'required'
		}

		const validation = await validateAll(request.all(), rules)

		if(validation.fails()){
			return validation.messages()
		}

		const articleData = request.only(['name','description'])
		const article = await Article.create(articleData)
		return article
	}

	async update({ params, request}){
		const article = await Article.find(params.id)

		const rules = {
			name: 'required',
			description: 'required'
		}

		const validator = await validateAll(request.all(),rules)

		if(validator.fails()){
			return validator.messages()
		}

		if(article.name != request.input('name')){
			article.name = request.input('name')
		}

		if(article.description != request.input('description')){
			article.description = request.input('description')
		}

		await article.save()
		return article
	}

	async destroy({ params }){
		const article = await Article.find(params.id)

		await article.delete()
	}
}

module.exports = ArticleController
