import { TenderForm } from '@/store/types';

const contractorTypes = ['Supplier', 'Carpenter', 'Contractor', 'Furniture, fixtures & equipment (FF&E) supplier', 'Painter', 'Architect']

/* Simulate loading data from server */
export const Api = {

  getContractorTypes: () => {
    return new Promise((ok, ko) => {
      setTimeout(function(){
        ok(contractorTypes)
      }, 2000)
    })
  },

  loadTender: (tender:TenderForm) => {
    return new Promise((ok,ko) => {
      setTimeout(function(){
        ok(tender)
      }, 2000)
    })
  }

}
