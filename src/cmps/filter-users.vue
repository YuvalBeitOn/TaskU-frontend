<template>
  <section class="filter-form flex column">
    <h4 class="filter-title">{{ title }}</h4>
    <button class="filter-btn flex align-center" @click="updateFilter('All')">
      All
    </button>
    <button
      class="filter-btn relative flex align-center"
      @click="updateFilter(user._id)"
      v-for="user in users"
      :key="user._id"
      type="submit"
    >
      <div class="user-avatar">
        <avatar className="img-profile-preview" :size="25" :user="user" />
      </div>
      <span v-if="user.fullName" class="filter-txt user-filter">{{
        user.fullName
      }}</span>
    </button>
  </section>
</template>

<script>
import Avatar from '@/cmps/user-avatar.vue'

export default {
  props: {
    users: Array,
    title: String
  },
  methods: {
    updateFilter(filterBy) {
      const filterObj = { title: this.title.toLowerCase(), opt: filterBy }
      this.$emit('updateFilter', filterObj)
    }
  },
  components: {
    Avatar
  }
}
</script>

<style></style>
