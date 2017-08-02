import { DatasetTypes } from '../mutation-types'

const state = {
  all: []
}

// getters
const getters = {
  [DatasetTypes.all]: state => state.all
}

// actions
const actions = {
  [DatasetTypes.add] ({ commit }, dataset) {
    commit(DatasetTypes.add, dataset)
  },
  [DatasetTypes.remove] ({ commit }, dataset) {
    commit(DatasetTypes.remove, dataset)
  }
}

// mutations must be synchronous
const mutations = {
  [DatasetTypes.add] (state, dataset) {
    dataset.id = Math.random().toString().replace('.', '')
    state.all.push(dataset)
  },
  [DatasetTypes.remove] (state, dataset) {
    state.all.forEach(function (d, i) {
      if (d.id === dataset.id) {
        state.all.splice(i, 1)
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
