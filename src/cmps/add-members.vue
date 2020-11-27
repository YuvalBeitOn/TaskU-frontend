<template>
<section class="members">
 <h3 class="title-members">{{firstTitle}}</h3>
    <ul  class="clean-list first members-list" >
      <li v-for="member in members" :key="member._id">
        <span class="member-name">{{ member.fullName }}</span> 
        <i @click.stop="emitRemoveMember(member._id)" class="action-icon fas fa-minus"></i>
      </li>
    </ul>
    <h3 class="title-members">{{secondTitle}}</h3>
    <ul class="clean-list members-list" >
      <li v-for="aMember in allMembers" :key="aMember._id">
       <span class="member-name">{{ aMember.fullName }}</span> 
        <i @click.stop="emitAddMember(aMember)" class="action-icon fas fa-plus"></i>

      </li>
    </ul>
</section>

</template>

<script>
export default {
  props:{
   members:Array,
    allMembers:Array,
    firstTitle:String,
    secondTitle:String
  },
  methods:{
    emitAddMember(member){
      this.$emit('addMember',member)
    },
    emitRemoveMember(id){
      this.$emit('removeMember',id)
    }
  }
}
</script>

<style>
</style>