export default function (obj) {
  return obj.forEach && typeof obj.forEach === 'function'
}
