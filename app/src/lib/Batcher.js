let defaults = {
  batchSize: 100,
  maxPerMinute: 150,
  timeout: 10000
}

let isPromise = function (obj) {
  return obj.then && typeof obj.then === 'function'
}

let isArray = function (obj) {
  return obj.forEach && typeof obj.forEach === 'function'
}

export default function Batcher (all, batchHandler, resultHandler, opts) {
  let batchSize = opts.batchSize || defaults.batchSize
  let maxPerMinute = opts.maxPerMinute || defaults.maxPerMinute
  
  return new Promise(function (resolve, reject) {
    if (!isArray(all)) {
      let msg = 'Invalid argument, not an array, but a ' + (typeof all)
      console.error(msg, all)
      reject(new Error(msg))
    }
    let results = []

    let next = function (batch) {
      if (batch.length < 1) {
        resolve(results)
      }
      let result = batchHandler(batch)
      
      if (isPromise(result)) {
        result.then(resultHandler).catch(reject)
      } else if (isArray(result)) {
        results.concat(result)
      } else {
        console.error('Invalid Batch Handler Result: ', result)
        reject(new Error('Invalid Batch Handler Result'))
      }
      
      setTimeout(function () {
        next(all.slice(0, batchSize - 1))
      }, maxPerMinute / 60 * 1000)
    }

    next(all.slice(0, batchSize - 1)) // process 1st batch
  })
}
