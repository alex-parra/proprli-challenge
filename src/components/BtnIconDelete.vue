<template>
  <button class="btn btnIconDelete" @click="onClick">
    {{txt}}
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'BtnIconDelete',
    props: ['lbl', 'handleClick'],
    computed: {
      txt(): string {
        return this.lbl || '×'
      }
    },
    methods: {
      onClick() {
        this.handleClick && this.handleClick()
      }
    }
  })
</script>

<style lang="scss">
  .btn.btnIconDelete {
    background-color: transparent;
    border: none;
    color: #cb0000;
    font-size: 16px;
    font-weight: bold;
    padding: 3px 6px;
    line-height: 1.1;
    &:hover {
      color: #fff;
      background-color: #cb0000;
    }
  }
</style>
