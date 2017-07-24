/*
 * Each line in text is matched against the regex
 */
export default function match (pattern, patternOpts, text) {
  if (!pattern) { return [] }
  let regex = new RegExp(pattern, patternOpts)
  let matches = []

  text.split('\n').forEach(function (line, i) {
    if (line.match(regex)) {
      matches.push(line)
    }
  })

  return matches
}
