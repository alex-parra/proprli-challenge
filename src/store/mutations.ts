import { MutationTree } from 'vuex';
import { RootState, TenderForm, TenderTimeframe, TenderBid } from './types'
import _ from 'lodash'
import { findById, filterRecursive } from '@/utils'

export default <MutationTree<RootState>> {

  setContractorTypes(state, payload:{ct: string[]}) {
    state.contractorTypes = [...payload.ct]
  },

  saveForm(state) {
    state.tenders.push({...state.form})
    state.form = {} as TenderForm
  },

  saveFormDraft(state) {
    if( Object.keys(state.form).length !== 0 ) {
      state.drafts.push({...state.form})
      state.form = {} as TenderForm
    }
  },

  setFormLoading(state, yesNo:boolean) {
    state.formLoading = yesNo
  },

  setFormField(state, payload:{field:string, value:any}) {
    if( !state.form.id ) {
      state.form.id = new Date().getTime()
    }
    Object.assign(state.form, {[payload.field]: payload.value})
  },

  saveTimeframe(state, payload:TenderTimeframe) {
    const dateItem = payload
    let timeframes = state.form.timeframes ? [...state.form.timeframes] : []
    if( !dateItem.id ) {
      dateItem.id = new Date().getTime()
    }

    const index:number = _.findIndex(timeframes, ['id', dateItem.id]);
    if( index >= 0 ) {
      timeframes[index] = dateItem
    } else {
      timeframes.push(dateItem)
    }
    state.form.timeframes = timeframes
  },

  deleteTimeframe(state, payload:TenderTimeframe) {
    const dateItem = payload
    if( !state.form.timeframes || state.form.timeframes.length === 0 ) {
      return;
    }

    const timeframesToKeep = state.form.timeframes.filter(item => item.id !== dateItem.id)
    state.form.timeframes = timeframesToKeep
  },

  editDraft(state, payload:{draft:TenderForm}) {
    const {draft} = payload
    state.form = {...draft}
    state.drafts = state.drafts.filter(d => d !== draft)
  },

  deleteDraft(state, payload:TenderForm) {
    state.drafts = state.drafts.filter(d => d !== payload)
  },

  editTender(state, payload:{tender:TenderForm}) {
    const {tender} = payload
    state.form = {...tender}
    state.tenders = state.tenders.filter(t => t !== tender)
  },

  deleteTender(state, payload:TenderForm) {
    state.tenders = state.tenders.filter(t => t !== payload)
  },

  updateBids(state, payload:{bids:TenderBid[]}) {
    state.form.bids = payload.bids.slice(0)
  },

  addBid(state) {
    const bid: TenderBid = {
      id: new Date().getTime(),
      description: '',
      qty: 0,
      unit: 'm2',
      unitPrice: null,
      total: null
    }
    state.form.bids = [...state.form.bids, bid]
  },

  updateBid(state, payload:{bid:TenderBid}) {
    const bids:TenderBid[] = state.form.bids.slice(0)
    const target = findById(bids, payload.bid.id)
    if( target ) {
      Object.assign(target, {...payload.bid})
      state.form.bids = bids
    }
  },

  deleteBid(state, payload:{bid:TenderBid}) {
    const {bid} = payload
    const bidsToKeep = filterRecursive(state.form.bids, bid)
    state.form.bids = bidsToKeep
  }

}
