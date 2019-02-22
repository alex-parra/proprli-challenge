<template>
  <FormStepWrap :step="5" :title="'Review Tender Details'" :handleNext="submitForm" :nextBtnText="'Submit Tender'">

    <section class="review">
      <h3>Property Details</h3>
      <div class="sideBySide">
        <div>
          <FieldInput :lbl="'Property Name'" :value="form.propertyName" :editable="false" />
          <FieldInput :lbl="'Address'" :value="form.propertyAddress" :editable="false" />
          <FieldInput :lbl="'City'" :value="form.propertyCity" :editable="false" />
          <FieldInput :lbl="'Post Code'" :value="form.propertyPostCode" :editable="false" />
        </div>
        <div>
          <div class="propertyPhoto" :style="{backgroundImage:'url('+ form.propertyPhoto +')'}"></div>
        </div>
      </div>
    </section>

    <section class="review">
      <h3>Contractor Details</h3>
      <FieldInput :lbl="'Type of Contractor'" :value="form.contractorType" :editable="false" />
    </section>

    <section class="review">
      <h3>Statement of Work</h3>
      <PreviewBids :bids="form.bids" />
    </section>

    <section class="review">
      <h3>Tender Timeframes</h3>
      <PreviewTimeframe v-for="(item,k) in form.timeframes" :dateItem="item" :key="k" />
    </section>

  </FormStepWrap>
</template>

<script lang="ts">
import Vue from 'vue'
import { TenderForm } from '@/store/types';
import FormStepWrap from '@/components/FormStepWrap.vue'
import FieldInput from '@/components/FieldInput.vue'
import PreviewTimeframe from '@/components/PreviewTimeframe.vue'
import PreviewBids from '@/components/PreviewBids.vue'

export default Vue.extend({
  name: 'FormStep5',
  components: {
    FormStepWrap, FieldInput, PreviewTimeframe, PreviewBids
  },
  computed: {
    form():TenderForm {
      return this.$store.state.form
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('saveForm').then(() => {
        this.$router.push({name:'home'})
      })
    },
  }
})
</script>

<style lang="scss" scoped>

  section.review {
    > h3 {
      text-transform: uppercase;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      margin-bottom: 7px;
      font-size: 13px;
    }
    & + section.review {
      margin-top: 50px;
    }

    .sideBySide {
      display: flex;
      align-items: flex-start;
      > div { flex: 1 1 100%; }
    }
  }

  .propertyPhoto {
    background-color: #eee;
    border: 1px solid #ddd;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 3px;
    &::before {
      content: "";
      display: block;
      padding-bottom: 50%;
    }
  }

  .bidRow {
    width: 100%;
    padding: 4px 8px;
    background-color: #eee;
    border-radius: 3px;
    & + .bidRow {
      margin-top: 4px;
    }
    > .field {
      flex: 0 0 100px;
      &:first-child { flex: 1 1 100%; }
      &:last-of-type { flex: 0 0 150px; }
    }
  }

</style>
