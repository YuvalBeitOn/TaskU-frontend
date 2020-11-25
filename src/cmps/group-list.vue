<template>
    <section v-if="groups.length" class="group-list">
        <ul class="clean list flex wrap align-center justify-center gap">
            <group-preview
                v-for="group in groups"
                :key="group._id"
                :group="group"
            />
        </ul>
    </section>
</template>

<script>
import groupPreview from "@/cmps/group-preview.vue";

export default {
    name: "group-list",
    computed: {
        groups() {
            return this.$store.getters.groups
        }
    },
    components: {
        groupPreview,
    },
};
</script>
