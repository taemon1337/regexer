import yaml from 'js-yaml'

export default {
  name: 'stringify',
  filter: function (value) {
    return yaml.safeDump(value)
  }
}
