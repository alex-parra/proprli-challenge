import { ActionTree } from 'vuex';
import { RootState, TenderForm } from './types'

import { Api } from '@/services/api'

export default <ActionTree<RootState, RootState>> {

  loadContractorTypes({commit}) {
    Api.getContractorTypes().then(ct => {
      commit('setContractorTypes', {ct: ct})
    })
  },

  editDraft({commit}, payload:TenderForm) {
    commit('setFormLoading', true)
    Api.loadTender(payload).then(data => {
      commit('editDraft', {draft: data})
      commit('setFormLoading', false)
    })
  },

  editTender({commit}, payload:TenderForm) {
    commit('setFormLoading', true)
    Api.loadTender(payload).then(data => {
      commit('editTender', {tender: data})
      commit('setFormLoading', false)
    })
  },

  saveForm({commit}) {
    commit('saveForm')
  },

  saveFormDraft({commit}) {
    commit('saveFormDraft')
  },

}
