import { PatternTypes, MessageTypes } from '../mutation-types'
import Api from '@/api'
import store from '@/store'

const state = {
  editing: null,
  current: null,
  all: [],
  selected: []
}

// getters
const getters = {
  [PatternTypes.fetch]: state => state.all,
  [PatternTypes.selected]: state => state.selected,
  [PatternTypes.edit]: state => state.editing,
  [PatternTypes.current]: state => state.current
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
  [PatternTypes.edit] ({ commit }, pattern) {
    commit(PatternTypes.edit, pattern)
  },
  [PatternTypes.unedit] ({ commit }, pattern) {
    commit(PatternTypes.unedit, pattern)
  },
  [PatternTypes.save] ({ commit }, pattern) {
    Api.patterns.save(pattern).then(function (resp) {
      commit(PatternTypes.save, resp.data)
      store.dispatch(PatternTypes.unedit)
    })
    .catch(function (err) {
      let msg = err.toString()
      if (err.response && err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
        msg = err.response.data.error.message
      }
      store.dispatch(MessageTypes.add, { title: 'Error saving pattern!', klass: 'notification is-danger', content: msg })
    })
  },
  [PatternTypes.remove] ({ commit }, pattern) {
    Api.patterns.remove(pattern).then(function (resp) {
      commit(PatternTypes.remove, pattern)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, { title: 'Error removing pattern!', klass: 'notification is-danger', content: err.toString() })
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
  [PatternTypes.edit] (state, pattern) {
    state.editing = true
    state.current = pattern
  },
  [PatternTypes.unedit] (state) {
    state.editing = null
    state.current = null
  },
  [PatternTypes.save] (state, pattern) {
    let idx = -1
    state.all.forEach(function (p, i) {
      if (p.id === pattern.id) {
        idx = i
      }
    })

    if (idx >= 0) {
      state.all.splice(idx, 1, pattern)
    } else {
      state.all.push(pattern)
    }

    idx = -1
    state.selected.forEach(function (p, i) {
      if (p.id === pattern.id) {
        idx = i
      }
    })

    if (idx >= 0) {
      state.selected.splice(idx, 1, pattern)
    }
  },
  [PatternTypes.remove] (state, pattern) {
    state.all = state.all.filter(function (p) { return p.id !== pattern.id })
    state.selected = state.selected.filter(function (p) { return p.id !== pattern.id })
  },
  [PatternTypes.select] (state, pattern) {
    let found = -1
    state.selected.forEach(function (p, i) {
      if (p.id === pattern.id) {
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
