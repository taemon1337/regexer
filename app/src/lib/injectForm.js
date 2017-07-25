export default function injectForm (form, data) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (form.elements[key]) {
        form.elements[key].value = data[key]
      }
    }
  }
}
