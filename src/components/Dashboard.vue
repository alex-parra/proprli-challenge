<template>
  <div class="dashboard">

    <div class="myTenders">
      <h3>
        My Tenders
        <router-link class="btn btn-main" to="/create">New Tender</router-link>
      </h3>
      <div class="noResults" v-if="myTenders.length === 0">
        <h5>You haven't saved any Tender yet.</h5>
        <div v-if="myDrafts.length === 0">Click "New Tender" to start.</div>
        <div v-else>Click "New Tender" to create a new one or<br/> edit a Draft below and continue where you left off.</div>
      </div>
      <TendersList :tenders="myTenders" />
    </div>

    <section class="myTenders drafts" v-if="myDrafts.length > 0">
      <h3>Draft Tenders</h3>
      <TendersList :tenders="myDrafts" :isDrafts="true" />
    </section>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TenderForm } from '@/store/types';
import TendersList from '@/components/TendersList.vue'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    TendersList
  },
  computed: {
    myDrafts():TenderForm[] {
      return this.$store.state.drafts.slice(0).reverse()
    },
    myTenders():TenderForm[] {
      return this.$store.state.tenders.slice(0).reverse()
    }
  }
});
</script>

<style lang="scss">
  .myTenders {
    padding: 20px 0 40px;
    h3 {
      align-items: center;
      display: flex;
      font-size: 2rem;
      justify-content: space-between;
      margin: 0 0 5px 5px;
    }

    .noResults {
      background-color: #f4f4f4;
      padding: 50px 20px 60px;
      color: #555;
      border-radius: 3px;
      min-height: 35vh;
    }
  }
</style>
