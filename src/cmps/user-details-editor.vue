
      <template>
  <section class="user-editor flex justify-center">
    <form class="form-editor flex column" @submit="saveDetails">
      <label for="">Email:</label>
      <el-input
        placeholder="Email"
        v-model="userToEdit.email"
        :disabled="true"
      ></el-input>
      <label for="">Name:</label>

      <el-input
        placeholder="Name"
        v-model="userToEdit.fullName"
        :disabled="true"
      ></el-input>
      <label for="">Phone:</label>

      <el-input
        placeholder="Phone"
        v-model.number="userToEdit.phone"
      ></el-input>
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
      <div class="img upload">
        <div v-if="!isLoading">
          <img
            v-if="userToEdit.imgUrl"
            width="55px"
            :src="userToEdit.imgUrl"
            alt="user image"
          />
          <label for="imgUploader">
            <h2 class="white">Upload Image</h2>
            <input @change="onUploadImg" type="file" id="imgUploader" />
          </label>
        </div>
        <img
          v-else
          src="@/assets/imgs/loader.gif"
          width="100px"
          height="100px"
          class="loader-app"
        />
      </div>
      <button type="submit" style="color: white">Save Changes</button>
    </form>
  </section>
</template>
      
      <script>
import { imgUpload } from '@/services/img-upload.service'

export default {
  name: 'user-editor',
  props: {
    user: Object,
  },
  data() {
    return {
      userToEdit: null,
      isLoading: false,
    }
  },
  methods: {
    saveDetails() {
      const copyUser = JSON.parse(JSON.stringify(this.userToEdit))
      this.$store.dispatch({ type: 'upadteUser', user: copyUser })
       this.$notify({
        message: 'The Details updated',
        position: 'bottom-left',
        duration: 2000
      })
    },
    async onUploadImg(ev) {
      console.log('cliclll')
      console.log(ev, 'eve')
      this.isLoading = true
      const res = await imgUpload(ev)
      const imgId = res.public_id
     const imgurl =` http://res.cloudinary.com/mstoysguy/image/upload/w_150,h_100,c_fill,r_max/${imgId}.${res.format}`
      this.userToEdit.imgUrl = imgurl
      this.isLoading = false
    },
  },
  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user))
  },
}
</script>
      <style >
input[type='file'] {
  opacity: 0;
}
</style>
      
      


