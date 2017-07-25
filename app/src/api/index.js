import axios from 'axios'

let base = '/api'

let patterns = {
  fetch: function () {
    return axios.get(base + '/patterns')
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
