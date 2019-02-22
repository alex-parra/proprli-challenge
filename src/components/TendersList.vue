<template>
  <ol class="tendersList">
    <li v-for="(tender, k) in tenders" :key="k">
      <div>
        <strong>{{tender.propertyName}}</strong><br/>
        <small>{{tender.id}}</small>
      </div>
      <small>Contractor: {{tender.contractorType || '- ?? -'}}</small>
      <div class="actions">
        <btn :text="'Edit'" :classes="['btn-sm']" :handleClick="() => editTender(tender)" />
        <BtnIconDelete :handleClick="() => deleteTender(tender)" />
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { TenderForm } from '@/store/types';
  import BtnIconDelete from '@/components/BtnIconDelete.vue'

  export default Vue.extend({
    props: ['tenders', 'isDrafts'],
    components: {
      BtnIconDelete
    },
    methods: {
      editTender(tender:TenderForm) {
        this.$router.push({name:'form-step-1'})
        const action = this.isDrafts ? 'editDraft' : 'editTender'
        this.$store.dispatch(action, tender)
      },
      deleteTender(tender:TenderForm) {
        const action = this.isDrafts ? 'deleteDraft' : 'deleteTender'
        if( confirm('Are you sure?') ) {
          this.$store.commit(action, tender)
        }
      }
    }
  })
</script>

<style lang="scss">
  .tendersList {
    list-style: none;
    margin: 0;
    padding: 0;
    > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
      padding: 10px 15px;
      padding-left: 10px;
      border-radius: 5px;

      & + li {
        margin-top: 10px;
      }
    }
  }
</style>
