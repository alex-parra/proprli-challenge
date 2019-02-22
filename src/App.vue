<template>
  <div id="app">
    <header>
      <div class="container">
        <h1>
          <router-link to="/">
            <img src="@/assets/proprli-logo-white.png" alt="Proprli" />
          </router-link>
        </h1>
      </div>
    </header>
    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Btn from '@/components/Btn.vue'

  Vue.component('btn', Btn)

  export default Vue.extend({
    name: 'App',
    created() {
      this.$store.dispatch('loadContractorTypes')
    },
  })
</script>
