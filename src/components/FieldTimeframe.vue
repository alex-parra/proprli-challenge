<template>
  <div class="timeframe">
    <div v-if="!isEditable" class="lbl">{{lbl}}</div>
    <FieldInput v-else :value="dateItem.lbl" :handleChange="(val) => dataChanged('lbl', val)" />
    <datepicker :value="date" @selected="(val) => dataChanged('date', val)" placeholder="Pick date"></datepicker>
    <BtnIconDelete v-if="isEditable" :handleClick="deleteItem" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldInput from '@/components/FieldInput.vue'
import BtnIconDelete from '@/components/BtnIconDelete.vue'
import Datepicker from 'vuejs-datepicker';

export default Vue.extend({
  name: 'FieldTimeframe',
  props: ['dateItem', 'onChange', 'onDelete'],
  components: {
    Datepicker, FieldInput, BtnIconDelete
  },
  computed: {
    date():Date {
      return this.dateItem.date
    },
    lbl():string {
      return this.dateItem.lbl
    },
    isEditable():boolean {
      return (this.dateItem.editable !== false)
    }
  },
  methods: {
    dataChanged(fld:string, data:Date|string) {
      const newDateItem = {...this.dateItem, [fld]: data}
      this.onChange(newDateItem)
    },
    deleteItem() {
      this.onDelete(this.dateItem)
    }
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

    > .field,
    > .lbl {
      flex: 0 0 auto;
      width: calc(50% - 10px);
      margin-right: 10px;
    }

    > .lbl {
      font-weight: bold;
      padding-left: 10px;
    }

    > .btn {
      margin-left: 10px;
    }
  }
</style>
