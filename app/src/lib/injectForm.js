let isArray = function (a) {
  return a.forEach && typeof a.forEach === 'function'
}

let setValue = function (el, val) {
  if (el.type === 'select-multiple' && isArray(val)) {
    for (let i = 0; i < el.options.length; i += 1) {
      el.options[i].selected = val.indexOf(el.options[i].value) >= 0
    }
  } else if (el.type === 'checkbox' && val) {
    el.checked = 'checked'
  } else {
    el.value = val
  }
}

export default function injectForm (form, data) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (form.elements[key]) {
        setValue(form.elements[key], data[key])
      }
    }
  }
}
