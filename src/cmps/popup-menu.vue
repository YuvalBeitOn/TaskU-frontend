<template>
    <section class="popup-menu" v-if="menuItems">
        <div
            class="menu-item" style="position: absolute; top: 0; right: 0;"
            @click="itemClicked(menuitem.func)"
            v-for="(menuitem, idx) in menuItems"
            :key="idx"
        >
            <i :class="getIconClass(idx)"> </i>
            {{ menuitem.txt }}
        </div>
    </section>
</template>

<script>
export default {
    props: {
        menuItems: {
            type: Array,
        },
    },
    methods: {
        getIconClass(idx) {
            return `fas fa-${this.menuItems[idx].iconStr}`
        },
        itemClicked(itemFunction) {
            itemFunction()
            this.$emit('closePopup')
        },
    },
    created() {
        console.log(this.menuItems)
    },
}
</script>

<style>
</style>