export default function textToFunction (text) {
  if (!text) { return null }
  try {
    let fn = null
    eval('fn = ' + text) // eslint-disable-line no-eval
    if (fn && typeof fn === 'function') {
      return fn
    } else {
      return null
    }
  } catch (err) {
    console.warn('Invalid Text Function: ', err)
    return null
  }
}
