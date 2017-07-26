import textToFunction from '@/lib/textToFunction'

let postProcess = function (val, key, pattern, line) {
  // pattern may contain a post processing function called for_each_result for custom processing
  if (pattern.for_each_result) {
    let fn = textToFunction(pattern.for_each_result)
    if (fn) {
      return fn(val, key, pattern, line)
    } else {
      return val
    }
  } else {
    return val
  }
}

let parseMatch = function (match, line, pattern) {
  return match.map(function (val, i) {
    return postProcess(val, i, pattern, line)
  })
}

let parseJsonMatch = function (match, line, pattern) {
  let ret = {}

  for (let i = 1; i < match.length; i += 1) {
    // pattern may contain json_keys which should be an array of keys to inject as json keys, other wise the keys will be the indexes
    let key = pattern.json_keys ? pattern.json_keys[i - 1] : (i - 1).toString()
    let val = match[i]

    ret[key] = postProcess(val, key, pattern, line)
  }

  return ret
}

export default function Matcher (regex, line, pattern) {
  let matches = []
  let parser = textToFunction(pattern.parse_line)
  if (parser && typeof parser === 'function') {
    try {
      line = parser(regex, line, pattern)
    } catch (err) {
      console.warn('Error in custom parser: ', err.toString(), line, pattern)
    }
  }

  let m = regex.exec(line)

  while (m) {
    let match = pattern.json_keys ? parseJsonMatch(m.slice(0, 1), line, pattern) : parseMatch(m.slice(0, 1), line, pattern)
    matches.push(match)
    m = regex.exec(line)
  }

  return matches
}
