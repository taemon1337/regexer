import { EnrichTypes, MessageTypes } from '../mutation-types'
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
  [EnrichTypes.fetch]: state => state.all,
  [EnrichTypes.selected]: state => state.selected,
  [EnrichTypes.edit]: state => state.editing,
  [EnrichTypes.current]: state => state.current
}

// actions
const actions = {
  [EnrichTypes.fetch] ({ commit }, opts) {
    Api.enrichs.fetch().then(function (resp) {
      commit(EnrichTypes.fetch, resp.data)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, { title: 'Error fetching enrichs!', klass: 'notification is-danger', content: err.toString() })
    })
  },
  [EnrichTypes.edit] ({ commit }, enrich) {
    commit(EnrichTypes.edit, enrich)
  },
  [EnrichTypes.unedit] ({ commit }, enrich) {
    commit(EnrichTypes.unedit, enrich)
  },
  [EnrichTypes.save] ({ commit }, enrich) {
    Api.enrichs.save(enrich).then(function (resp) {
      commit(EnrichTypes.save, resp.data)
      store.dispatch(EnrichTypes.unedit)
    })
    .catch(function (err) {
      let msg = err.toString()
      if (err.response && err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
        msg = err.response.data.error.message
      }
      store.dispatch(MessageTypes.add, { title: 'Error saving enrich!', klass: 'notification is-danger', content: msg })
    })
  },
  [EnrichTypes.remove] ({ commit }, enrich) {
    Api.enrichs.remove(enrich).then(function (resp) {
      commit(EnrichTypes.remove, enrich)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, { title: 'Error removing enrich!', klass: 'notification is-danger', content: err.toString() })
    })
  },
  [EnrichTypes.select] ({ commit }, enrich) {
    commit(EnrichTypes.select, enrich)
  }
}

// mutations must be synchronous
const mutations = {
  [EnrichTypes.fetch] (state, enrichs) {
    state.all = enrichs
  },
  [EnrichTypes.edit] (state, enrich) {
    state.editing = true
    state.current = enrich
  },
  [EnrichTypes.unedit] (state) {
    state.editing = null
    state.current = null
  },
  [EnrichTypes.save] (state, enrich) {
    let idx = -1
    state.all.forEach(function (p, i) {
      if (p.id === enrich.id) {
        idx = i
      }
    })

    if (idx >= 0) {
      state.all.splice(idx, 1, enrich)
    } else {
      state.all.push(enrich)
    }

    idx = -1
    state.selected.forEach(function (p, i) {
      if (p.id === enrich.id) {
        idx = i
      }
    })

    if (idx >= 0) {
      state.selected.splice(idx, 1, enrich)
    }
  },
  [EnrichTypes.remove] (state, enrich) {
    state.all = state.all.filter(function (p) { return p.id !== enrich.id })
    state.selected = state.selected.filter(function (p) { return p.id !== enrich.id })
  },
  [EnrichTypes.select] (state, enrich) {
    let found = -1
    state.selected.forEach(function (p, i) {
      if (p.id === enrich.id) {
        found = i
      }
    })
    if (found !== -1) {
      state.selected.splice(found, 1)
    } else {
      state.selected.push(enrich)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
