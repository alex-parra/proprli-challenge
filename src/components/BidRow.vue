<template>
  <div class="bidRow">
    <FieldInput :editable="isEditable" :value="bid.description" :handleChange="(val) => updateBid(val, 'description')" :defaultValue="'- Not specified -'" />
    <FieldInput :editable="isEditable" :value="bid.qty" :handleChange="(val) => updateBid(val, 'qty')" />
    <FieldInput :editable="isEditable" :value="bid.unit" :handleChange="(val) => updateBid(val, 'unit')" />
    <FieldInput :editable="isEditable" :value="bid.unitPrice" :handleChange="(val) => updateBid(val, 'unitPrice')" />
    <FieldInput :editable="isEditable" :value="bid.total" :handleChange="(val) => updateBid(val, 'total')" />
    <BtnIconDelete v-if="isDeletable" :handleClick="deleteBid" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FieldInput from '@/components/FieldInput.vue'
  import BtnIconDelete from '@/components/BtnIconDelete.vue'

  export default Vue.extend({
    name: 'BidRow',
    props: ['bid', 'editable', 'allowDelete'],
    components: {
      FieldInput,
      BtnIconDelete
    },
    computed: {
      isEditable(): boolean {
        return this.editable !== false
      },
      isDeletable(): boolean {
        return this.isEditable && this.allowDelete !== false
      }
    },
    methods: {
      updateBid(val: string, fld: string) {
        const bid = { ...this.bid, [fld]: val}
        this.$store.commit('updateBid', {bid: bid})
      },
      deleteBid() {
        this.$store.commit('deleteBid', {bid: this.bid})
      }
    }
  })
</script>

<style lang="scss">
  .bidRow {
    display: flex;
    align-items: center;
    position: relative;
    >.field {
      flex: 1 1 100%;
      margin: 0;
    }
    >.field+.field {
      margin: 0 0 0 5px;
    }
    .btnIconDelete {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(4px, -50%);
    }
  }
</style>
