import axios from 'axios'

let defaultPatterns = require('@/assets/patterns.json')
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

export default {
  patterns: patterns
}
