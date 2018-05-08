import {api} from './api'

export const get = (page = 1) => {
  return api.get(`/articles?page=${page}`)
}

export const unpaginated = () => {
  return api.get(`/articles/unpaginated`)
}

export const create = (client) => {
  return api.post(`/articles`, client)
}
