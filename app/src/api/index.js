import axios from 'axios'

let removeIds = function (record) { return Object.assign({}, record, { id: undefined }) }
let defaultPatterns = require('@/assets/patterns.json').map(removeIds)
let defaultEnrichs = require('@/assets/enrichs.json').map(removeIds)
let base = '/api'

let proxy = axios.create({
  baseURL: '/proxy/',
  timeout: 10000
})

proxy.interceptors.request.use(function (req) {
  req.url = req.baseURL + req.url
  return req
})

let patterns = {
  fetch: function () {
    return new Promise(function (resolve, reject) {
      axios.get(base + '/patterns').then(function (resp) {
        if (resp.data && resp.data.length > 0) {
          resolve(resp)
        } else {
          resolve({ data: defaultPatterns })
        }
      })
      .catch(function () {
        resolve({ data: defaultPatterns })
      })
    })
  },
  save: function (formdata) {
    if (formdata.id) {
      return axios.put(base + '/patterns/' + formdata.id, Object.assign({}, formdata, { id: undefined }))
    } else {
      return axios.post(base + '/patterns', formdata)
    }
  },
  remove: function (pattern) {
    return axios.delete(base + '/patterns/' + pattern.id)
  }
}

let enrichs = {
  fetch: function () {
    return new Promise(function (resolve, reject) {
      axios.get(base + '/enrichs').then(function (resp) {
        if (resp.data && resp.data.length > 0) {
          resolve(resp)
        } else {
          resolve({ data: defaultEnrichs })
        }
      })
      .catch(function () {
        resolve({ data: defaultEnrichs })
      })
    })
  },
  save: function (formdata) {
    if (formdata.id) {
      return axios.put(base + '/enrichs/' + formdata.id, Object.assign({}, formdata, { id: undefined }))
    } else {
      return axios.post(base + '/enrichs', formdata)
    }
  },
  remove: function (enrich) {
    return axios.delete(base + '/enrichs/' + enrich.id)
  }
}

export default {
  axios: axios,
  proxy: proxy,
  patterns: patterns,
  enrichs: enrichs
}
