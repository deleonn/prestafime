import axios from 'axios'

const URL = 'http://localhost:3333/api'

export const api = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {'Content-type': 'Application/json', 'Accept': 'Application/json'}
})
