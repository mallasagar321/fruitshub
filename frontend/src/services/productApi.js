import axios from 'axios'
const BASE = import.meta.env.VITE_NODE_API
export const getProducts = (filters = {}) =>
  axios.get(`${BASE}/products`, { params: filters }).then(r => r.data)

export const getProductById = (id) =>
  axios.get(`${BASE}/products/${id}`).then(r => r.data)