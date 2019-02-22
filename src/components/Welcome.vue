<template>
  <div class="welcome">
    <h2>
      Welcome...
      <small>to the world’s easiest project management and procurement tool.</small>
    </h2>
    <btn :text="'Create my first Tender'" :classes="['btn-main', 'btn-lg']" :handleClick="newTender" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    methods: {
      newTender(ev: Event) {
        this.$router.push({
          name: 'create'
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
  .welcome {
    padding: 60px 20px;
    h2 {
      font-size: 30px;
      padding-top: 15vh;
      small {
        display: block;
        font-size: .8em;
        font-weight: normal;
      }
    }
  }
</style>
