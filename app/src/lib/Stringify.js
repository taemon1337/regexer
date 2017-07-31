import isArray from '@/lib/isArray'
import isObject from '@/lib/isObject'

export default function Stringify (obj) {
  if (isArray(obj)) {
    return obj.map(function (item) { return Stringify(item) }).join('\n')
  } else if (isObject(obj)) {
    let o = {}
    for (let key in obj) {
      o[key] = Stringify(obj[key])
    }
    return JSON.stringify(o, null, 2)
  } else {
    return obj
  }
}
