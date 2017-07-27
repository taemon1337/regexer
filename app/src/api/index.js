import axios from 'axios'
import ipgeo from './ipgeo'

let defaultPatterns = require('@/assets/patterns.json')
let defaultEnrichs = require('@/assets/enrichs.json')
let base = '/api'

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
      return axios.put(base + '/patterns/' + formdata.id, formdata)
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
      return axios.put(base + '/enrichs/' + formdata.id, formdata)
    } else {
      return axios.post(base + '/enrichs', formdata)
    }
  },
  remove: function (enrich) {
    return axios.delete(base + '/enrichs/' + enrich.id)
  }
}

export default {
  patterns: patterns,
  enrichs: enrichs,
  ipgeo: ipgeo
}
