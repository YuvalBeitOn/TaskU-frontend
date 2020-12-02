<template>
  <section class="members-actions">
          <el-badge :hidden="hiddenBadge" :value="memebrsToshow.length" class="item" type="primary">

      <!-- MEMBERS -->
    <div  v-tooltip.top="toolTipTxt"
      @click="toggleMemebrs"
      v-if="memebrsToshow && memebrsToshow" 
      class="flex memebrs-show-container"
    >
      <div v-for="(member, idx) in memebrsToshow" :key="member._id">
        <span :class="`memebr-show memebr-${idx}`">
          <avatar :size="size" :user="member"
        /></span>
      </div>
    </div>
    <!-- BUTTON -->
    <button   v-if="!memebrsToshow.length" @click="toggleMemebrs" class="btn-close">
              <i  v-tooltip.top="toolTipTxt"  :class="`${classIcon} far fa-user-circle fa-icon`"></i>
    </button>
    </el-badge>

    <!-- ADD MEMEBRS CMP -->
    <slot v-if="isMembersShown" name="add-members"></slot>
    <div
      class="back-drop-layer"
      v-if="isMembersShown"
      @click.prevent="isMembersShown = false"
    ></div>
  </section>
</template>

<script>
import Avatar from './user-avatar'
export default {
  props: {
    members: {
      type: Array,
    },
    toolTipTxt:{
        type:String
    },
    hiddenBadge:{
        type:Boolean,
        default:false
    },
    classIcon:String,
    size:{
        type:Number,
        default:20
  },},
  data() {
    return {
      isMembersShown: false,
    }
  },
  computed: {
    memebrsToshow() {
    var memebrs= JSON.parse(JSON.stringify(this.members))
      if (this.members.length > 3) {
        memebrs = memebrs.splice(0, 3)
          }
      return  memebrs
    },
  },
  methods: {
    toggleMemebrs() {
      console.log('lololololo')
      this.isMembersShown = !this.isMembersShown
    },
  },
  created() {
   
    
  },
  components: {
    Avatar,
  },
}
</script>

<style>

</style>