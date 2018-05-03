'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.get('/articles/unpaginated', 'ArticleController.unpaginated')
  Route.get('/clients/unpaginated', 'ClientController.unpaginated')

  Route.resource('/users', 'UserController').apiOnly()
  Route.resource('/clients', 'ClientController').apiOnly()
  Route.resource('/roles', 'RoleController').apiOnly()
  Route.resource('/articles', 'ArticleController').apiOnly()
  Route.resource('/inventory', 'InventoryController').apiOnly()
}).prefix('api')

