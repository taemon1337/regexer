import axios from 'axios'

let base = '/api/'

let patterns = {
  fetch: function () {
    return axios.get(base + '/patterns')
  },
  save: function (formdata) {
    if (formdata._id) {
      return axios.put(base + '/patterns/' + formdata._id, formdata)
    } else {
      return axios.post(base + '/patterns', formdata)
    }
  }
}

export default {
  patterns: patterns
}
