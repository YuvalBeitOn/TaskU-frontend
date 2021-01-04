<template>
  <section class="members-actions">
    <el-badge
      :hidden="hiddenBadge"
      :value="members.length"
      class="item"
      type="primary"
    >
      <!-- MEMBERS -->
      <div
        v-tooltip.top="toolTipTxt"
        @click="togglemembers"
        v-if="membersToshow && membersToshow"
        class="flex members-show-container relative"
      >
        <div v-for="(member, idx) in membersToshow" :key="member._id">
          <span :class="`member-show member-${idx}`">
            <avatar :className="className" :size="size" :user="member"
          /></span>
        </div>
      </div>
      <!-- BUTTON -->
      <button
        v-if="!membersToshow.length"
        @click="togglemembers"
        class="btn-close"
      >
        <i
          v-tooltip.top="toolTipTxt"
          :class="`${classIcon} far fa-user-circle fa-icon`"
        ></i>
      </button>
    </el-badge>

    <!-- ADD members CMP -->
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
      type: Array
    },
    toolTipTxt: {
      type: String
    },
    hiddenBadge: {
      type: Boolean,
      default: false
    },
    classIcon: String,
    className: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 25
    }
  },
  data() {
    return {
      isMembersShown: false
    }
  },
  computed: {
    membersToshow() {
      var members = JSON.parse(JSON.stringify(this.members))
      if (this.members.length > 3) {
        members = members.splice(0, 3)
      }
      return members
    }
  },
  methods: {
    togglemembers() {
      this.isMembersShown = !this.isMembersShown
    }
  },
  created() {},
  components: {
    Avatar
  }
}
</script>

<style></style>
