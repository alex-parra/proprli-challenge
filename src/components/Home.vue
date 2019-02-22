<template>
  <div class="home">
    <Welcome v-if="justStarting" />
    <Dashboard v-else />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { TenderForm } from '@/store/types';
  import Welcome from '@/components/Welcome.vue'
  import Dashboard from '@/components/Dashboard.vue'

  export default Vue.extend({
    name: 'Home',
    components: {
      Welcome,
      Dashboard
    },
    computed: {
      justStarting(): boolean {
        return (this.myTenders.length === 0 && this.myDrafts.length === 0)
      },
      myDrafts(): TenderForm[] {
        return this.$store.state.drafts
      },
      myTenders(): TenderForm[] {
        return this.$store.state.tenders
      }
    },
  });
</script>
