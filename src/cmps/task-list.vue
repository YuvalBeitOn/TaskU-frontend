<template>
    <section v-if="clonedTasks" class="task-list width100">
        <ul class="clean-list flex wrap align-center justify-center gap">
            <draggable class="clean-list flex wrap align-center justify-center gap" v-model="clonedTasks" @end="updateTasks">
            <task-preview
                v-for="task in clonedTasks"
                :taskColor="taskColor"
                :key="task.id"
                :task="task"
                :statuses="board.statuses"
                :priorities="board.priorities"
                :groupId="groupId"
                @deleteTask="deleteTask"
                @updateTask="updateTask"
                :boardMembers="board.members"
            />
            </draggable>
        </ul>
        <form class="flex" @submit.prevent="addTask">
            <input
                class="add-task-input"
                @focus="showAddBtn"
                v-model="txt"
                type="text"
                placeholder="+ Add Task"
            />
            <button v-show="isAddBtnShowen" type="submit">Add</button>
        </form>
    </section>
</template>

<script>
import taskPreview from '@/cmps/task-preview'
import { boardService } from '@/services/board.service'
  import draggable from 'vuedraggable'


export default {
    name: 'task-list',
    data() {
        return {
            txt: '',
            isAddBtnShowen: false,
            clonedTasks: null
        }
    },
    props: {
        tasks: Array,
        groupId: String,
        taskColor: String,
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
    },
    methods: {
        showAddBtn() {
            this.isAddBtnShowen = true
        },
        getGroupById() {
            const idx = this.board.groups.findIndex(
                (group) => group.id === this.groupId
            )
            return this.board.groups[idx]
        },
        addTask() {
            const newTask = boardService.getEmptyTask()
            newTask.txt = this.txt
            const group = this.getGroupById()
            group.clonedTasks.push(newTask)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
            this.txt = ''
            this.isAddBtnShowen = false
        },
        deleteTask(taskId) {
            const group = this.getGroupById()
            const taskIdx = group.clonedTasks.findIndex((task) => task.id === taskId)
            group.clonedTasks.splice(taskIdx, 1)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
        },
        updateTask(newTask) {
            const group = this.getGroupById()
            const taskIdx = group.tasks.findIndex(
                (task) => task.id === newTask.id
            )
            group.tasks.splice(taskIdx, 1, newTask)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
        },
        updateTasks(){
            const group = this.getGroupById()
            group.tasks = this.clonedTasks;
            this.$store.dispatch({
                type:'saveBoard',
                board: this.board
            })
        },
    },
    components: {
        taskPreview,
    draggable
    },
    created(){
        this.clonedTasks = JSON.parse(JSON.stringify(this.tasks))
    }
}
</script>
