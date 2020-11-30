<template>
    <section class="popup-menu" v-if="menuItems">
        <div
            class="menu-item"
            @click="itemClicked(menuitem.func)"
            v-for="(menuitem, idx) in menuItems"
            :key="idx"
        >
            <i :class="getIconClass(idx)"> </i>
            {{ menuitem.txt }}
        </div>
        <el-divider/>
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
}
</script>

<style>
</style>