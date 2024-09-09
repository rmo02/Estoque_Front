import axios from 'axios'

export const app = axios.create({
  baseURL: 'http://192.168.7.40:3000/api'
})
