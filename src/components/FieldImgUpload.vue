<template>
  <form enctype="multipart/form-data" novalidate>
    <div v-if="imgUrl" class="dropbox">
      <div class="previewImg" :style="{backgroundImage:'url('+ imgUrl +')'}" />
      <BtnIconDelete :handleClick="deletePhoto" />
    </div>
    <input v-else type="file" name="img" @change="filesChange" accept="image/*" />
    <div v-if="error" class="error">{{error}}</div>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import BtnIconDelete from '@/components/BtnIconDelete.vue'

  export default Vue.extend({
    name: 'FieldImgUpload',
    props: ['handleFile', 'currentImg', 'handleDelete'],
    components: {
      BtnIconDelete
    },
    data: () => ({
      error: null as string|null
    }),
    computed: {
      imgUrl(): string {
        return this.currentImg || null
      }
    },
    methods: {
      filesChange(ev: Event) {
        this.error = null
        const input = ev.target as HTMLInputElement
        if (!input.files || input.files.length === 0) return;

        const fieldName = input.name
        const file = input.files && input.files.item(0)
        if( file && (file.size/1024)/1024 > 1.5 ) {
          this.error = 'Please upload an image with at most 1.5MB'
          return
        }

        this.handleFile([file])
      },
      deletePhoto() {
        this.handleDelete && this.handleDelete()
      }
    }
  })
</script>

<style scoped lang="scss">
  .dropbox {
    display: flex;
    align-items: center
  }

  .dropbox .previewImg {
    flex: 0 0 auto;
    width: 150px;
    margin-right: 10px;
    background-position: center center;
    background-size: cover;
    border: 1px solid #ddd;
    border-radius: 3px;
    &::before {
      content: "";
      display: block;
      padding-bottom: 70%;
    }
  }

  .error {
    padding: 1px 8px;
    color: #cb0000;
  }
</style>
