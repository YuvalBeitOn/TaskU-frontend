<template>
  <section class="notifs-filters flex space-between">
    <div class="tab-label all">
      <button class="filter-notif-btn " @click="setFilter('all')">All</button>
      <span class="underline-active "></span>
    </div>
    <div class="tab-label unread">
      <button class="filter-notif-btn unread" @click="setFilter('unread')">
        Unread
      </button>
      <span class="underline-active"></span>
    </div>
    <div class="tab-label mentions">
      <button class="filter-notif-btn " @click="setFilter('mentions')">
        Mentions
      </button>
      <span class="underline-active"></span>
    </div>
    <div class="tab-label assigned">
      <button class="filter-notif-btn " @click="setFilter('assigned')">
        Assigned
      </button>
      <span class="underline-active"></span>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    setFilter: Function
  }
}
</script>

<style></style>
