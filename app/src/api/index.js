import axios from 'axios'

let base = '/api'

let patterns = {
  fetch_static: function (resolve, reject) {
    axios.get('/static/patterns.json').then(function (resp) {
      resolve(resp)
    })
    .catch(function (err) {
      reject(err)
    })
  },
  fetch: function () {
    return new Promise(function (resolve, reject) {
      axios.get(base + '/patterns').then(function (resp) {
        if (resp.data && resp.data.length === 0) {
          patterns.fetch_static(resolve, reject)
        }
      })
      .catch(function () {
        patterns.fetch_static(resolve, reject)
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
