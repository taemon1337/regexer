import axios from 'axios'

let ipapi = {
  baseUrl: 'http://ip-api.com',
  maxSize: 100,
  maxPerMinute: 150,
  timeout: 10000
}

let api = axios.create({
  baseUrl: ipapi.baseUrl,
  timeout: ipapi.timeout
})

let json = function (ip) {
  return api.get('/json/' + ip)
}

let sendBatch = function (ips) {
  return api.post('/batch', ips.map(function (ip) { return { query: ip } }))
}

let sendAll = function (ips, eachCallback) {
  return new Promise(function (resolve, reject) {
    let all = []

    let next = function (batch) {
      sendBatch(batch)
      .then(function (resp) {
        if (eachCallback) {
          eachCallback(resp)
        } else {
          all.concat(resp.data)
        }

        setTimeout(function () {
          next(ips.slice(0, ipapi.maxSize - 1)) // send next chunk after waiting max per minute / 60 * 1000 to ensure we don't get banned
        }, ipapi.maxPerMinute / 60 * 1000)
      })
      .catch(reject)
    }

    next(ips.slice(0, ipapi.maxSize - 1)) // ip-api only allows up to 100 per request
  })
}

export default {
  json: json,
  sendBatch: sendBatch,
  sendAll: sendAll
}
