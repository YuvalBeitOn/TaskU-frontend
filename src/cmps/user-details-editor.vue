<template>
  <section class="user-editor flex justify-center align-center">
    <form class="form-editor flex column" @submit="saveDetails">
      <label for="">Email:</label>
      <el-input
        placeholder="Email"
        v-model="userToEdit.email"
        :disabled="true"
      ></el-input>
      <label for="">Name:</label>

      <el-input placeholder="Name" v-model="userToEdit.fullName"></el-input>
      <label for="">Phone:</label>

      <el-input placeholder="Phone" v-model.trim="userToEdit.phone"></el-input>
      <label for="">Address:</label>

      <el-input
        placeholder="Address"
        v-model.trim="userToEdit.address"
      ></el-input>
      <label for="">Company name:</label>
      <el-input
        placeholder="Company name"
        v-model.trim="userToEdit.companyName"
      ></el-input>
      <button type="submit" style="color: white">Save Changes</button>
    </form>
    <upload-img @sendImgUrl="imgUrl" :isUserDetails="true">
      <img
        class="img-uploaded-user-editor"
        v-if="userToEdit.imgUrl"
        :src="userToEdit.imgUrl"
        alt="image"
      />
    </upload-img>
  </section>
</template>

<script>
import uploadImg from './upload-img'

export default {
  name: 'user-editor',
  props: {
    user: Object
  },
  data() {
    return {
      userToEdit: null,
      isLoading: false
    }
  },
  methods: {
    imgUrl(url) {
      this.userToEdit.imgUrl = url
    },
    async saveDetails() {
      const copyUser = JSON.parse(JSON.stringify(this.userToEdit))
      const updatedUser = await this.$store.dispatch({
        type: 'updateUser',
        user: copyUser
      })
      this.$store.commit({ type: 'setUser', user: updatedUser })
      this.$emit('loadUser')
      this.$notify({
        message: 'The Details updated',
        position: 'bottom-left',
        duration: 2000
      })
    }
  },

  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user))
  },
  components: {
    uploadImg
  }
}
</script>
<style></style>
