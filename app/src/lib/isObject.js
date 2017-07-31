import isArray from '@/lib/isArray'

export default function (obj) {
  return typeof obj === 'object' && !isArray(obj)
}
