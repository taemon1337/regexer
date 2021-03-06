import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import messages from './modules/messages'
import patterns from './modules/patterns'
import enrichs from './modules/enrichs'
import datasets from './modules/datasets'
import global from './modules/global'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    messages,
    patterns,
    enrichs,
    datasets,
    global
  },
  strict: debug
})
