<template>
  <div class="previewBids">
    <div v-for="(bid, k) in bids" :key="k">
      <BidRow :bid="bid" :editable="false" />
      <PreviewBids v-if="hasChildren(bid)" :bids="bid.children" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import BidRow from '@/components/BidRow.vue'
import { TenderBid } from '@/store/types';

  export default Vue.extend({
    name: 'PreviewBids',
    props: ['bids'],
    components: {
      BidRow
    },
    methods: {
      hasChildren(bid:TenderBid):boolean {
        return !!(bid.children && bid.children.length !== 0)
      }
    }
  })
</script>

<style lang="scss">
  .previewBids {
    .bidRow {
      width: 100%;
      padding: 5px 0;
      >.field {
        flex: 0 0 100px;
        span {
          display: block;
          text-align: center;
        }
        &:first-child {
          flex: 1 1 100%;
        }
        &:first-child span {
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
    .previewBids {
      margin-left: 15px;
    }
  }
</style>
