<template>
  <section class="notifs-filters flex space-between">
    <div class="tab-label">
      <button class="filter-notif-btn" @click="setFilter">All</button>
      <span class="underline-active"></span>
    </div>
    <div class="tab-label">
      <button class="filter-notif-btn" @click="setFilter">Unread</button>
      <span class="underline-active"></span>
    </div>
    <div class="tab-label">
      <button class="filter-notif-btn" @click="setFilter">Mentions</button>
      <span class="underline-active"></span>
    </div>
    <div class="tab-label">
      <button class="filter-notif-btn" @click="setFilter">Assigned</button>
      <span class="underline-active"></span>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    setFilter(ev) {
      const notifsToShow = ev.target.innerText
      console.log(notifsToShow)
      this.$emit('setFilter', notifsToShow.toLowerCase())
    }
  }
}
</script>

<style></style>
