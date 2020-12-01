<template>
  <section class="user-avatar">
    <template v-if="!user.imgUrl">
           <avatar
           class="profile-img"
          backgroundColor="#0085ff"
          :size="size"
          :username="user.fullName"
        ></avatar>
        </template>
        <img v-else :src="user.imgUrl" class="profile-img" />
  </section>
</template>

<script>
import Avatar from 'vue-avatar'


export default {
  props:{
    user:Object,
    size:{
      type:Number,
      default:20
    }
  },
components:{
   Avatar

}
}
</script>

<style>
 
</style>