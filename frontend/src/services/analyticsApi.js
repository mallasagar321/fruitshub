 import axios from 'axios'
const BASE = 'http://localhost:8000/api'

export const getProfitLoss = (month) =>
  axios.get(`${BASE}/analytics/profit-loss`, { params: { month } }).then(r => r.data)

export const getSeasonality = () =>
  axios.get(`${BASE}/analytics/seasonality`).then(r => r.data)