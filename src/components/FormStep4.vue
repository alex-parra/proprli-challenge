<template>
  <FormStepWrap :step="4" :title="'Time Schedule'">

    <div class="timeframes">
      <FieldTimeframe v-for="(item, k) in dateItems" :dateItem="item" :key="k" :onChange="updateTimeframe" :onDelete="deleteTimeframe" />
    </div>
    <btn :text="'+ Add row'" :handleClick="newTimeframe" />

  </FormStepWrap>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { TenderTimeframe } from '@/store/types';
  import FormStepWrap from '@/components/FormStepWrap.vue'
  import FieldTimeframe from '@/components/FieldTimeframe.vue'

  export default Vue.extend({
    name: 'FormStep4',
    components: {
      FormStepWrap,
      FieldTimeframe
    },
    computed: {
      dateItems(): TenderTimeframe[] {
        return this.$store.state.form.timeframes || []
      }
    },
    methods: {
      updateTimeframe(dateItem: TenderTimeframe) {
        this.$store.commit('saveTimeframe', dateItem)
      },
      newTimeframe() {
        this.$store.commit('saveTimeframe', {lbl: '', date: null})
      },
      deleteTimeframe(dateItem: TenderTimeframe) {
        this.$store.commit('deleteTimeframe', dateItem)
      },
    },
    created() {
      if( this.dateItems.length === 0 ) {
        this.$store.commit('saveTimeframe', {lbl: 'Tender Deadline', date: null, editable: false})
      }
    }
  })
</script>
