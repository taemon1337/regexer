import api from '@/api'
import isArray from '@/lib/isArray'
import isPromise from '@/lib/isPromise'

window.api = api

let defaults = {
  batchSize: 100,
  maxPerMinute: 150,
  timeout: 10000
}

let findArray = function (obj, failure) {
  if (isArray(obj)) {
    return obj
  } else if (typeof obj === 'object') {
    if (isArray(obj.data)) {
      return obj.data
    } else {
      for (let key in obj) { // check each key for an array and return the first found
        if (isArray(obj[key])) {
          return obj[key]
        }
      }
    }
  }
  console.error('Could not find array result!', obj)
  failure('Could not find array result!')
}

/**
 * Batcher returns a Promise
 * Args:
 *   all - an array of items to be batch processed
 *   batchHandler - a function to receive a batch of items to process
 *   resultHandler - used if batchHandler returns a Promise
 *   opts - { batchSize: 100, maxPerMinute: 150 } overrides
 * if batchHandler function returns a Promise...
 *   then the resultHandler is passed each batchHandler response
 * else if batchHandler function returns an Array
 *   then the returned Promise will resolve with all returned arrays concatted into a single array
 */
export default function Batcher (all, batchHandler, opts) {
  let batchSize = opts.batchSize > 0 ? opts.batchSize : defaults.batchSize
  let maxPerMinute = opts.maxPerMinute > 0 ? opts.maxPerMinute : defaults.maxPerMinute

  return new Promise(function (resolve, reject) {
    if (!isArray(all)) {
      let msg = 'Invalid argument, not an array, but a ' + (typeof all)
      console.error(msg, all)
      reject(new Error(msg))
    }
    let results = []
    let count = 0

    let next = function (batch) {
      count += 1
      console.log('Batch ' + count + ': ' + batch.length + ' items...')
      let result = batchHandler(batch, api.proxy)

      if (isPromise(result)) {
        result.then(function (resp) {
          results = results.concat(findArray(resp, reject))

          if (all.length < 1) {
            resolve(results)
          } else {
            setTimeout(function () {
              next(all.splice(0, batchSize))
            }, 60 * 1000 / maxPerMinute)
          }
        }).catch(reject)
      } else if (isArray(result)) {
        results = results.concat(result)

        if (all.length < 1) {
          return results
        } else {
          setTimeout(function () {
            next(all.splice(0, batchSize))
          }, 60 * 1000 / maxPerMinute)
        }
      } else {
        console.error('Invalid Batch Handler Result: ', result)
        reject(new Error('Invalid Batch Handler Result'))
      }
    }

    next(all.splice(0, batchSize)) // process 1st batch
  })
}
