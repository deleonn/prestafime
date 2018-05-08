import {api} from './api'

export const get = (page = 1) => {
  return api.get(`/clients?page=${page}`)
}

export const unpaginated = () => {
  return api.get(`/clients/unpaginated`)
}

export const create = (client) => {
  return api.post(`/clients`, client)
}
