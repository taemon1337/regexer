export default function isPromise (obj) {
  return obj.then && typeof obj.then === 'function'
}
