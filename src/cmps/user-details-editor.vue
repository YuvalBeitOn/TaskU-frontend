
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

      <el-input placeholder="Phone" v-model.number="userToEdit.phone"></el-input>
      <label for="">Address:</label>

      <el-input placeholder="Address" v-model.trim="userToEdit.address"></el-input>
      <label for="">Company name:</label>

      <el-input
        placeholder="Company name"
        v-model.trim="userToEdit.companyName"
      ></el-input>
                     <div  class="img upload" v-if="!isLoading">
                        <template v-if="!isLoading">
                    
                    <img v-if="userToEdit.imgUrl" width="55px" :src="signupCredentials.imgUrl" alt="user image">
                    <label for="imgUploader">
                        <button type="up-pic" class="white">Upload Image</button>
                    <input  type="file" id="imgUploader">

                    </label>
                    </template>
                <img v-else src="@/assets/imgs/loader.gif" class="loader-app" />

                    </div>
      <button style="color: white">Save Changes</button>
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
      console.log('saveUser:', copyUser)
    },
            async onUploadImg(ev) {
            console.log('cliclll');
            console.log(ev,'eve');
            this.isLoading = true
            const res = await imgUpload(ev)
            console.log('res:', res.url)
            this.userToEdit.imgUrl = res.url;
            this.isLoading = false
        },
  },
  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user))
  },
}
</script>
      


