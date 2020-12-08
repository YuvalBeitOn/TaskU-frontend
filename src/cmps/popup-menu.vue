<template>
    <section class="popup-menu" v-if="menuItems" ref="popup">
        <div
            class="menu-item flex align-center"
            @click.stop="itemClicked(menuitem.func)"
            v-for="(menuitem, idx) in menuItems"
            :key="idx">
            <span class="menu-item-icon flex align-center justify-center"
                ><i :class="getIconClass(idx)"> </i>
            </span>
            <span class="menu-item-txt">{{ menuitem.txt }}</span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        menuItems: {
            type: Array,
        },
        offsetY: Number,
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
    mounted() {
        if (this.offsetY) {
            let elpopUp = this.$refs.popup
            elpopUp.style.left = '95%'
            elpopUp.style.top = `${this.offsetY}px`
        }
    },
}
</script>
