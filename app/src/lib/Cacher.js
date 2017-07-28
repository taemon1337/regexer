import isArray from '@/lib/isArray'
import isPromise from '@/lib/isPromise'

export default function Cacher (handler, opts) {
  let ctx = this
  let cacheSize = opts.cacheSize || 100
  let outputs = []
  let inputs = []

  let cacher = function (key, a, b, c) {
    let val = handler(key, a, b, c)

    if (isArray(val)) {
      
    } else if (isPromise(val)) {
      
    } else {
      inputs.push()
    }

    return val
  }
}
