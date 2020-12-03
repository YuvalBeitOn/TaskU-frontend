<template>
  <section class="upload-image-container">
    <div class="container-img flex column" v-if="!isLoading">
      <label class="label-img" for="imgUploader">
        <div
          v-tooltip.top="'Upload Image'"
          class="white btn-upload-container"
        >
          <slot name="btn-upload"
            >
            <i class="fad fa-upload upload-icon"></i>
            </slot>
        </div>
        <input @change="onUploadImg" type="file" id="imgUploader" />
      </label>
      <slot name="imgUrl">
        <img class="img-uploaded" v-if="imgUrl" :src="imgUrl" alt="image" />
      </slot>
    </div>
    <img v-else src="@/assets/imgs/loader.gif" class="img-loader" />
  </section>
</template>

<script>
import { imgUpload } from '@/services/img-upload.service'
export default {
  data() {
    return {
      isLoading: false,
      imgUrl: null
    }
  },
  computed() {},
  methods: {
    async onUploadImg(ev) {
      this.isLoading = true
      const res = await imgUpload(ev)
      this.imgUrl = res.url
      this.$emit('sendImgUrl', this.imgUrl)
      this.isLoading = false
    }
  },
  created() {}
}
</script>

<style></style>
