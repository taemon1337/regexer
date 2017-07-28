import axios from 'axios'
import textToFunction from '@/lib/textToFunction'

export default function Enricher (match, pattern, enrich) {
  try {
    let fn = textToFunction(enrich.enrich_function)

    if (fn) {
      return fn(match, pattern, axios)
    } else {
      return ''
    }
  } catch (err) {
    return ''
  }
}
