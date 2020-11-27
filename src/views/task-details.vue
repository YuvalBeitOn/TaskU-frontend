<template>
    <section class="task-details-section">
        <div class="top-bar">
            <i @click.stop="closeBtn" class="fas fa-times"></i>
            <h1
                @blur.stop="updateTaskTxt"
                @keyup.enter="updateTaskTxt"
                contenteditable
            >
                {{ task.txt }}
            </h1>
        </div>
            <hr/>
        <!-- <h1>{{ task }}</h1> -->
    </section>
</template>

<script>
export default {
    name: 'task-details',
    props: {
        task: {
            type: Object,
        },
        groupId: {
            type: String,
        },
    },
    methods: {
        closeBtn() {
            this.$emit('close')
            this.$router.go(-1)
        },
        updateTaskTxt(ev) {
            console.log('this group id task details', this.groupId)
            const copiedTask = this.task
            copiedTask.txt = ev.target.innerText
            this.$emit('updateTaskTxt', {
                task: copiedTask,
                groupId: this.groupId,
            })
        },
    },
    created() {},
}
</script>
