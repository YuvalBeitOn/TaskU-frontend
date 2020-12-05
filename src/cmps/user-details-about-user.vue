
      <template>
  <section class="user-content flex justify-center">
    <div class="user-details-info flex column wrap">
      <h3>
        <div class="icon-container">
          <i class="icon-user fas fa-user"></i>
        </div>
        <strong class="title-details">Full name:</strong>{{ user.fullName }}
      </h3>
      <h3>
        <div class="icon-container">
          <i class="icon-user fas fa-envelope"></i>
        </div>
        <strong class="title-details">Email:</strong>{{ user.email }}
      </h3>
      <h3>
        <div class="icon-container">
          <i class="icon-user fas fa-phone"></i>
        </div>
        <strong class="title-details">Phone:</strong>{{ Phone }}
      </h3>
      <h3>
        <div class="icon-container">
          <i class="icon-user far fa-address-card"></i>
        </div>

        <strong class="title-details">Address:</strong>{{ address }}
      </h3>

      <h3>
        <div class="icon-container">
          <i class="icon-user far fa-building"></i>
        </div>
        
        <strong class="title-details">Company name:</strong>{{ companyName }}
      </h3>
    </div>
    <pre>
      {{user}}
    </pre>
  </section>
</template>
      
      <script>
export default {
  name: 'about-user',
  props: {
    user: Object,
  },
  computed: {
    Phone() {
      return this.user.phone ? this.user.phone : 'You didnt add a phone number'
    },
    address() {
      return this.user.address
        ? this.user.address
        : 'You didnt add a address yet'
    },
    companyName() {
      return this.user.companyName
        ? this.user.companyName
        : 'You didnt add a Company name yet'
    },
  },
}
</script>
      
      <style>


</style>