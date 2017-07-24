import { PatternTypes, MessageTypes } from '../mutation-types'
import Api from '@/api'
import store from '@/store'

const state = {
  all: [],
  selected: []
}

// getters
const getters = {
  [PatternTypes.fetch]: state => state.all,
  [PatternTypes.selected]: state => state.selected
}

// actions
const actions = {
  [PatternTypes.fetch] ({ commit }, opts) {
    Api.patterns.fetch().then(function (resp) {
      commit(PatternTypes.fetch, resp.data)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, { title: 'Error fetching patterns!', klass: 'notification is-danger', content: err.toString() })
    })
  },
  [PatternTypes.save] ({ commit }, formdata) {
    Api.patterns.save(formdata).then(function (resp) {
      commit(PatternTypes.save, resp.data)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, { title: 'Error saving pattern!', klass: 'notification is-danger', content: err.toString() })
    })
  },
  [PatternTypes.select] ({ commit }, pattern) {
    commit(PatternTypes.select, pattern)
  }
}

// mutations must be synchronous
const mutations = {
  [PatternTypes.fetch] (state, patterns) {
    state.all = patterns
  },
  [PatternTypes.select] (state, pattern) {
    let found = -1
    state.selected.forEach(function (p, i) {
      if (p._id === pattern._id) {
        found = i
      }
    })
    if (found !== -1) {
      state.selected.splice(found, 1)
    } else {
      state.selected.push(pattern)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
