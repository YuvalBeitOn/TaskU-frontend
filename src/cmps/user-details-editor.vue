
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
      <button style="color: white">Save Changes</button>
    </form>
  </section>
</template>
      
      <script>
export default {
  name: 'user-editor',
  props: {
    user: Object,
  },
  data() {
    return {
      userToEdit: null
    }
  },
  methods: {
    saveDetails() {
      const copyUser = JSON.parse(JSON.stringify(this.userToEdit))
      console.log('saveUser:', copyUser)
    },
  },
  created() {
    this.userToEdit = JSON.parse(JSON.stringify(this.user))
  },
}
</script>
      
  