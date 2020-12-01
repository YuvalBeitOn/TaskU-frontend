<template>
  <section class="filter-form flex column">
    <h4 class="filter-title">{{ title }}</h4>
    <button class="filter-btn" @click="updateFilter('All')">All</button>
    <button
      class="filter-btn relative"
      @click="updateFilter(user._id)"
      v-for="user in users"
      :key="user._id"
      type="submit"
    >
      <div class="user-avatar">
             <avatar :user="user" />

      </div>
      <span class="filter-txt">{{ user.fullName }}</span>
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
