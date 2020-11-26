<template>
    <li class="task-preview flex space-between align-center width100">
        <div class="task-txt flex">
            <span>{{ task.txt }}</span>
        </div>
        <div class="task-details flex">
            <span @click="sendToTaskDetails"
                ><i class="far fa-comment fa-icon"></i
            ></span>
            <div class="headers flex">
                <span><i class="far fa-user-circle fa-icon"></i></span>
                <span class="status">{{ task.status.txt }}</span>
                <span class="priority">{{ task.priority.txt }}</span>
                <label class="date-label" for="date">
                    <input
                        id="date"
                        class="date-input"
                        name="date"
                        type="date"
                    />
                </label>
            </div>
            <!-- <span>{{ task.dueDate }}</span> -->
        </div>
    </li>
</template>

<script>
import { eventBus } from '@/services/event-bus.service'
export default {
    name: 'task-preview',
    props: {
        task: Object,
    },
    methods: {
        sendToTaskDetails() {
            if (
                this.$route.params.taskId &&
                this.$route.params.taskId === this.task.id
            ) {
                return
            }
            eventBus.$emit('taskDetails', this.task)
            this.$router.push(
                `/board/${this.$route.params.boardId}/${this.task.id}`
            )
        },
    },
}
</script>
