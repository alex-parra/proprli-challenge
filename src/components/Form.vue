<template>
  <div class="form">
    <h1>
      Create Tender
      <btn :classes="['saveDraft']" :handleClick="saveDraft" :text="'Save as Draft'" />
    </h1>
    <div v-if="isLoading" class="formLoading">
      Loading Tender data...
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Form',
    components: {},
    computed: {
      isLoading(): boolean {
        return this.$store.state.formLoading
      }
    },
    methods: {
      saveDraft() {
        this.$router.push({
          name: 'home'
        })
      }
    },
    beforeDestroy() {
      this.$store.dispatch('saveFormDraft')
    }
  });
</script>

<style lang="scss">
  .formLoading {
    padding: 40px 10px;
    font-weight: bold;
    font-size: 20px;
    color: #999;
    animation: opacityPulse 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 1;
  }
</style>
