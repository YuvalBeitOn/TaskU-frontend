
      <template>
  <section  class="user-editor flex justify-center">
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
        
      ></el-input>
      <label for="">Phone:</label>

      <el-input
        placeholder="Phone"
        v-model.trim="userToEdit.phone"
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
<upload-img @sendImgUrl="imgUrl" />
    
      <button type="submit" style="color: white">Save Changes</button>
    </form>
  </section>
</template>
      
      <script>
import  uploadImg  from './upload-img'

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
    imgUrl(url){
      this.userToEdit.imgUrl=url
    },
    saveDetails() {
      const copyUser = JSON.parse(JSON.stringify(this.userToEdit))
      this.$store.dispatch({ type: 'upadteUser', user: copyUser })
       this.$notify({
        message: 'The Details updated',
        position: 'bottom-left',
        duration: 2000
      })
    },

  },
  
  created() {
     
    this.userToEdit = JSON.parse(JSON.stringify(this.user))
  },
  components:{
    uploadImg
  }
}
</script>
      <style >

</style>
      
      


