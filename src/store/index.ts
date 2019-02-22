import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { RootState } from './types'

import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({key: 'proprli', storage: localStorage})

const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexPersist.plugin],
  state: state,
  mutations: mutations,
  actions: actions
})

export default store
