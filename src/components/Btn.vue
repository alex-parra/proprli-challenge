<template>
  <button :class="btnClass" @click="onClick">{{txt}}</button>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: ['text', 'handleClick', 'classes'],
    computed: {
      txt(): string {
        return this.text || 'Click here'
      },
      btnClass(): string {
        let classes: string[] = ['btn']
        if (this.classes) {
          classes = classes.concat(this.classes)
        }
        return classes.join(' ')
      }
    },
    methods: {
      onClick(ev: Event) {
        this.handleClick && this.handleClick()
      }
    }
  })
</script>
