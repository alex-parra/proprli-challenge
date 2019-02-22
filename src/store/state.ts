import { RootState, TenderForm } from './types'

// Initial State

export default <RootState> {
  form: {
    id: null,
    propertyName: '',
    propertyAddress: '',
    propertyCity: '',
    propertyPostCode: '',
    propertyPhoto: '',
    contractorType: '',
    bids: [],
    timeframes: [],
  } as TenderForm,
  formLoading: false,
  drafts: [],
  tenders: [],
  contractorTypes: []
}

