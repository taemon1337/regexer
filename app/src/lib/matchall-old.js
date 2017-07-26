/*
 * Each line in text is matched against the regex
 */
export default function match (pattern, text) {
  try {
    if (!pattern) { return [] }
    let regex = new RegExp(pattern, 'g')
    let matches = []

    text.split('\n').forEach(function (line, i) {
      let m = regex.exec(line)

      while (m) {
        matches.push({ parsed: m[1], line: m[0], line_number: i })
        m = regex.exec(line)
      }
    })

    return matches
  } catch (err) {
    console.warn(err)
    return []
  }
}
