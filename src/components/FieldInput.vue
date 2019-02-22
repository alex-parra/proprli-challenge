<template>
  <div class="field">
    <label v-if="lbl">{{lbl}}:</label>
    <div>
      <slot>
        <input v-if="isEditable" :value="value" @input="onChange" autocomplete="off" />
        <span v-else>{{value || placeholder}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'FieldInput',
    props: ['lbl', 'value', 'defaultValue', 'handleChange', 'editable'],
    computed: {
      isEditable(): boolean {
        return this.editable !== false
      },
      placeholder(): string {
        return this.defaultValue || '- ?? -'
      }
    },
    methods: {
      onChange(ev: Event) {
        const elem = ev.target as HTMLInputElement
        this.handleChange && this.handleChange(elem.value)
      }
    },
  })
</script>

<style lang="scss">
  .field {
    display: flex;
    align-items: center;
    & + .field {
      margin-top: 10px;
    }
    label {
      cursor: pointer;
      flex: 0 0 auto;
      width: 25%;
      max-width: 200px;
      font-weight: bold;
      text-align: left;
    }
    > div {
      flex: 1 1 100%;
    }
  }
</style>
