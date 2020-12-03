<template>
    <side-bar @closeBtn="closeBtn">

<section class="members-list-section">
      <h3 class="title-members">Members</h3>
    <ul class="clean-list first members-list">
      <li class="member flex align-center" v-for="member in members" :key="member._id">
        <avatar :user="member" />

        <span class="member-name">{{ member.fullName }}</span>
        <button @click.stop="goToUserDetails(member._id)" class="btn-second"><span class="blue">Contact</span></button>
          
      </li>
    </ul>
    </section>
    </side-bar>

</template>

<script>
import sideBar from './sidebar'
import avatar from './user-avatar'
export default {
  props:{
    members:Array
  },
components: {sideBar,avatar},
methods:{
  closeBtn(){
    this.$emit('close')
  },
goToUserDetails(id){
    this.$router.push(`/user/${id}`)
}
}
}
</script>

<style>

</style>