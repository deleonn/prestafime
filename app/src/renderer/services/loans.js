import {api} from './api'

export const get = (page = 1) => {
  return api.get(`/loans?page=${page}`)
}

export const unpaginated = () => {
  return api.get(`/loans/unpaginated`)
}

export const create = (client) => {
  return api.post(`/loans`, client)
}
