<template>
    <section v-if="clonedGroups.length" class="group-container">
        <ul
            class="clean-list flex column align-center justify-center gap width100"
        >
            <draggable
                :list="clonedGroups"
                @end="emitUpdateGroups"
                animation="200"
                handle=".drag-btn"
            >
                <group-preview
                    v-for="group in clonedGroups"
                    :key="group._id"
                    :group="group"
                    @deleteGroup="emitDelete"
                    @updateGroup="updateGroup"
                    @emitForceRender="emitForceRender"
                    @duplicateGroup="duplicateGroup"
                />
            </draggable>
        </ul>
    </section>
</template>
<script>
import groupPreview from '@/cmps/group-preview.vue'
import draggable from 'vuedraggable'

export default {
    name: 'group-list',
    props: {
        groups: Array,
    },
    data() {
        return {
            clonedGroups: null,
        }
    },
    created() {
        this.clonedGroups = JSON.parse(JSON.stringify(this.groups))
    },
    components: {
        groupPreview,
        draggable,
    },
    methods: {
        duplicateGroup(group) {
            this.$emit('duplicateGroup', group)
        },
        emitDelete(groupId) {
            this.$emit('deleteGroup', groupId)
        },
        emitForceRender() {
            this.$emit('forceRender')
        },
        updateGroup(group) {
            this.$emit('updateGroup', group)
        },
        emitUpdateGroups() {
            this.$emit('updateGroups', this.clonedGroups)
        },
    },
}
</script>
