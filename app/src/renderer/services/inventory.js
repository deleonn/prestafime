import {api} from './api'

export const get = (page = 1) => {
  return api.get(`/inventory?page=${page}`)
}

export const create = (client) => {
  return api.post(`/inventory`, client)
}
