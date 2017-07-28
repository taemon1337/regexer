import api from '@/api'
import textToFunction from '@/lib/textToFunction'
import Batcher from '@/lib/Batcher'

export default function Enricher (all, enrich) {
  return new Promise(function (resolve, reject) {
    let handler = textToFunction(enrich.enrich_function)
    let batchopts = { batchSize: enrich.batch_size, maxPerMinute: enrich.max_per_minute }

    if (handler) {
      if (enrich.batchable) {
        Batcher(all, handler, batchopts).then(resolve).catch(reject)
      } else {
        try {
          resolve(all.map(function (item) {
            try {
              return handler(item, api.proxy)
            } catch (err) {
              console.warn('Error processing item', item, err)
              return err.toString()
            }
          }))
        } catch (err) {
          reject(err)
        }
      }
    } else {
      reject(new Error('Invalid Enrich Function!' + enrich.enrich_function))
    }
  })
}
