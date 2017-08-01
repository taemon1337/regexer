import api from '@/api'
import textToFunction from '@/lib/textToFunction'
import Batcher from '@/lib/Batcher'
import Promisify from '@/lib/Promisify'

let postProcess = function (val, input, enrich) {
  // enrich may contain a post processing function called for_each_result for custom processing
  if (enrich.for_each_result) {
    let fn = textToFunction(enrich.for_each_result)
    if (fn) {
      return fn(val, input, enrich)
    } else {
      return val
    }
  } else {
    return val
  }
}

/*
 * Enricher returns a promise which resolves an array of results.
 */
export default function Enricher (all, enrich) {
  let handler = textToFunction(enrich.enrich_function)
  let batchopts = { batchSize: enrich.batch_size, maxPerMinute: enrich.max_per_minute }
  let httphandler = enrich.proxyable ? api.proxy : api.axios

  if (handler) {
    let promisify = Promisify(handler)
    if (enrich.batchable) {
      // Batcher returns a Promise which resolves all of the results
      return Batcher(all, promisify, batchopts, httphandler).then(function (results) {
        let processed = []
        for (let i = 0; i < results.length; i += 1) {
          processed.push(postProcess(results[i], all[i], enrich))
        }
        return processed
      })
    } else {
      return Promise.all(all.map(function (item) {
        return promisify(item, httphandler).then(function (val) {
          return postProcess(val, item, enrich)
        })
      }))
    }
  } else {
    throw new Error('Invalid Enrich Function!' + enrich.enrich_function)
  }
}
