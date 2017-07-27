import { GlobalTypes } from '../mutation-types'

const state = {
  fullscreen: false,
  filter: null
}

// getters
const getters = {
  [GlobalTypes.fullscreen]: state => state.fullscreen,
  [GlobalTypes.filter]: state => state.filter
}

// actions
const actions = {
  [GlobalTypes.fullscreen] ({ commit }) {
    commit(GlobalTypes.fullscreen)
  },
  [GlobalTypes.filter] ({ commit }, filter) {
    commit(GlobalTypes.filter, filter)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.fullscreen] (state) {
    state.fullscreen = !state.fullscreen
  },
  [GlobalTypes.filter] (state, filter) {
    state.filter = filter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
