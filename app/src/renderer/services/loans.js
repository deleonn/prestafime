import {api} from './api'

export const get = (page = 1) => {
  return api.get(`/loans?page=${page}`)
}

export const unpaginated = () => {
  return api.get(`/loans/unpaginated`)
}

export const create = (loan) => {
  return api.post(`/loans`, loan)
}

export const completeLoan = (loan) => {
  return api.post(`/loans/completeLoan`, loan)
}
