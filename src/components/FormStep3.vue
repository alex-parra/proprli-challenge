<template>
  <FormStepWrap :step="3" :title="'Statement of Work'">

    <div class="bidsHeader">
      <div>Description</div>
      <div>Quantity</div>
      <div>Unit</div>
      <div>Unit price</div>
      <div>Total (£)</div>
    </div>
    <vue-nestable v-model="bids" :maxDepth="3" :threshold="40">
      <vue-nestable-handle slot-scope="{ item }" :item="item">
        <BidRow :bid="item" :allowDelete="bids.length > 1" />
      </vue-nestable-handle>
    </vue-nestable>

    <btn :classes="['addBid']" :handleClick="newBidRow" :text="'+ Add row'" />

  </FormStepWrap>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { TenderBid } from '@/store/types';
  import { VueNestable, VueNestableHandle } from 'vue-nestable'
  import FormStepWrap from '@/components/FormStepWrap.vue'
  import BidRow from '@/components/BidRow.vue'

  export default Vue.extend({
    name: 'FormStep3',
    components: {
      FormStepWrap,
      VueNestable,
      VueNestableHandle,
      BidRow
    },
    computed: {
      bids: {
        get(): TenderBid[] {
          return this.$store.state.form.bids || []
        },
        set(bids: TenderBid[]) {
          this.$store.commit('updateBids', {bids: bids})
        }
      }
    },
    methods: {
      newBidRow() {
        this.$store.commit('addBid')
      },
    },
    created() {
      if( this.bids.length === 0 ) this.newBidRow()
    }
  })
</script>

<style lang="scss">
  .nestable {
    position: relative;
    .nestable-list {
      margin: 0;
      padding: 10px 0 0 0;
      list-style-type: none;
    }
    >.nestable-list {
      padding: 0;
    }
    [draggable="true"] {
      cursor: move;
    }
  }

  .nestable-item,
  .nestable-item-copy {
    margin: 0;
    position: relative;
    + * {
      margin-top: 10px;
    }
    .nestable-item {
      margin-left: 10px;
    }
  }

  .nestable-item.is-dragging {
    .nestable-list {
      pointer-events: none;
    }
    * {
      opacity: 0;
      filter: alpha(opacity=0);
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f4f4f4;
      border: 2px dashed #ddd;
      border-radius: 3px;
    }
  }

  .nestable-drag-layer {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    pointer-events: none;
    >.nestable-list {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      background-color: transparent;
    }
  }

  .nestable-handle {
    position: relative;
    &::before {
      content: "⇵";
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translate(0%, -50%);
      width: 20px;
      text-align: center;
      font-size: 12px;
    }
  }

  .bidsHeader {
    display: flex;
    align-items: flex-end;
    margin-bottom: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #ddd;
    >div {
      flex: 0 0 100px;
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      color: #999;
      font-size: 11px;
    }
    >div+div {
      margin-left: 5px;
    }
    >div:first-child {
      flex: 1 1 100%;
      text-align: left;
    }
    >div:last-child {
      flex: 0 0 150px;
    }
  }

  .bidRow {
    width: 100%;
    >.field {
      flex: 0 0 100px;
      input {
        text-align: center;
      }
      &:first-child {
        flex: 1 1 100%;
      }
      &:first-child input {
        text-align: left;
      }
      &:last-of-type {
        flex: 0 0 150px;
      }
      &:last-child input {
        text-align: right;
      }
    }
  }

  .btn.addBid {
    margin-top: 10px;
  }
</style>
