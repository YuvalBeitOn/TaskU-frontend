<template>
    <section class="user-calendar">
        <h1>Hello {{ loggedinUser.fullName }}</h1>
        <!-- {{ boards }} -->
        <!-- <full-calendar :events="events" @event-selected="eventSelected" /> -->
    </section>
</template>

<script>
// import { FullCalendar } from 'vue-full-calendar'
// import 'fullcalendar/dist/fullcalendar.css'
import moment from 'moment'

//ToBeChanged: Implementing a better UI library like Vuetify Calendar

export default {
    methods: {
        eventSelected(ev) {
            this.$router.push(`/board/${ev.boardId}/task/${ev.taskId}`)
        },
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.user
        },
        boards() {
            return this.$store.getters.boards
        },
        events() {
            const events = []
            const todayDate = moment().format('YYYY-MM-DD')
            console.log(this.boards)
            this.boards.forEach((board) => {
                board.groups.forEach((group) => {
                    group.tasks.forEach((task) => {
                        const event = {
                            title: 'Task Name: ' + task.txt,
                            color: task.status.color,
                            start:
                                task.dueDate == ''
                                    ? todayDate
                                    : task.dueDate.substring(0, 16),
                            allday: task.dueDate.length > 13 ? false : true,
                            boardId: board._id,
                            taskId: task.id,
                        }
                        events.push(event)
                    })
                })
            })
            return events
        },
    },
    components: {
        // FullCalendar,
    },
}
</script>

<style>
</style>