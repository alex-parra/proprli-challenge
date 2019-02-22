<template>
  <div class="timeframe">
    <div class="lbl">{{lbl}}</div>
    <FieldInput :value="date" :editable="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldInput from '@/components/FieldInput.vue'

export default Vue.extend({
  name: 'PreviewTimeframe',
  props: ['dateItem'],
  components: {
    FieldInput
  },
  computed: {
    date():string|null {
      const {date} = this.dateItem
      return date ? new Date(date).toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'}) : '- date not specified -'
    },
    lbl():string {
      return this.dateItem.lbl
    },
  }
})

</script>

<style lang="scss" scoped>
  .timeframe {
    display: flex;
    align-items: center;

    & + .timeframe {
      margin-top: 10px;
    }

    > .lbl {
      flex: 0 0 auto;
      width: calc(50% - 10px);
      margin-right: 10px;
    }

    > .lbl {
      font-weight: bold;
      padding-left: 10px;
    }
  }
</style>
