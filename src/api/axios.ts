import axiosClass from 'axios'

let apiEndPoint
if (process.env.NODE_ENV === 'production') {
  apiEndPoint = process.env.API_END_POINT || 'prod_url'
} else {
  apiEndPoint = 'http://localhost:3000'
}


axiosClass.defaults.withCredentials = true
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// {
//   "Access -Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
// }
export const axios = axiosClass.create({
  baseURL: apiEndPoint,
})
