<template>
  <FormStepWrap :step="2" :title="'Select Contractor Type'">

    <FieldInput :lbl="'Contrator Type'">
      <FieldSmartSelect :options="contractorTypes" :active="contractorType" :defaultText="'- Select Contrator Type -'" :handleSelect="setContractorType" />
    </FieldInput>

  </FormStepWrap>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FormStepWrap from '@/components/FormStepWrap.vue'
  import FieldInput from '@/components/FieldInput.vue'
  import FieldSmartSelect from '@/components/FieldSmartSelect.vue'

  export default Vue.extend({
    name: 'FormStep2',
    components: {
      FormStepWrap,
      FieldInput,
      FieldSmartSelect
    },
    computed: {
      contractorType(): string {
        return this.$store.state.form.contractorType
      },
      contractorTypes(): string[] {
        return this.$store.state.contractorTypes
      }
    },
    methods: {
      setContractorType(data: any) {
        this.$store.commit('setFormField', {field: 'contractorType', value: data})
      }
    }
  })
</script>
