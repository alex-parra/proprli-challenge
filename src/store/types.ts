
// Store Types

export interface RootState {
  form: TenderForm
  formLoading: boolean
  drafts: TenderForm[]
  tenders: TenderForm[]
  contractorTypes: string[]
}

export interface TenderForm {
  id: number|null
  propertyName: string
  propertyAddress: string
  propertyCity: string
  propertyPostCode: string
  propertyPhoto: string
  contractorType: string
  bids: TenderBid[]
  timeframes: TenderTimeframe[]
}

export interface TenderTimeframe {
  id: number
  lbl: string
  date: Date
}

export interface TenderBid {
  id: number
  description: string
  qty: number
  unit: string|null
  unitPrice: number|null
  total: number|null
  children?: TenderBid[]
}
