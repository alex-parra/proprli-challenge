<template>
  <FormStepWrap :step="1" :title="'Property Details'">

    <FieldInput :lbl="'Property Name'" :value="form.propertyName" :handleChange="(val) => updateFormField('propertyName', val)" />
    <FieldInput :lbl="'Address'" :value="form.propertyAddress" :handleChange="(val) => updateFormField('propertyAddress', val)" />
    <FieldInput :lbl="'City'" :value="form.propertyCity" :handleChange="(val) => updateFormField('propertyCity', val)" />
    <FieldInput :lbl="'Post Code'" :value="form.propertyPostCode" :handleChange="(val) => updateFormField('propertyPostCode', val)" />
    <FieldInput :lbl="'Photo'">
      <FieldImgUpload :currentImg="form.propertyPhoto" :handleFile="uploadImg" :handleDelete="deletePhoto" />
    </FieldInput>

  </FormStepWrap>
</template>

<script lang="ts">
  import Vue from 'vue'
  import FormStepWrap from '@/components/FormStepWrap.vue'
  import FieldInput from '@/components/FieldInput.vue'
  import FieldImgUpload from '@/components/FieldImgUpload.vue'
  import { upload as FakeImgUpload } from '@/services/fake-img-upload'

  export default Vue.extend({
    name: 'FormStep1',
    components: {
      FormStepWrap,
      FieldInput,
      FieldImgUpload
    },
    computed: {
      form(): string {
        return this.$store.state.form
      },
    },
    methods: {
      updateFormField(fld: string, value: string) {
        this.$store.commit('setFormField', {field: fld, value: value})
      },
      uploadImg(imgs: File[]) {
        FakeImgUpload(imgs).then(urls => {
          if (urls.length === 0) return;
          this.$store.commit('setFormField', {field: 'propertyPhoto', value: urls[0]})
        })
      },
      deletePhoto() {
        this.$store.commit('setFormField', {field:'propertyPhoto', value:null})
      }
    }
  })
</script>
