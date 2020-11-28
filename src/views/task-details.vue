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
        <el-tabs>
            <el-tab-pane label="Task posts">
                <task-posts @updatePosts="updatePosts" :posts="task.posts" />
            </el-tab-pane>
            <el-tab-pane label="Task activities">
                <task-activities :activities="task.activities" />
            </el-tab-pane>
        </el-tabs>
        <!-- <h1>{{ task }}</h1> -->
    </section>
</template>

<script>
import taskPosts from '@/cmps/task-posts'
import taskActivities from '@/cmps/task-activities'
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
            this.$router.push(`/board/${this.$route.params.boardId}`)
        },
        updateTaskTxt(ev) {
            console.log('this group id task details', this.groupId)
            this.task.txt = ev.target.innerText
            const groupIdx = this.getGroupIdxById()
            const group = this.board.groups[groupIdx]
            const taskIdx = group.tasks.findIndex(
                (task) => task.id === this.task.id
            )
            group.tasks.splice(taskIdx, 1, this.task)
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
        },
        getGroupIdxById() {
            const idx = this.board.groups.findIndex(
                (group) => group.id === this.groupId
            )
            return idx
        },
        getTaskPath() {
            const groupIdx = this.getGroupIdxById()
            const group = this.board.groups[groupIdx]
            const taskIdx = group.tasks.findIndex(
                (task) => task.id === this.task.id
            )
            const task = group.tasks[taskIdx]
            return task
        },
        updatePosts(posts) {
            const task = this.getTaskPath()
            task.posts = posts
            this.$store.dispatch({
                type: 'saveBoard',
                board: this.board,
            })
        },
        // getTaskById() {
        //     let task
        //     const taskId = this.$route.params.taskId
        //     this.board.groups.forEach((group) => {
    
        //         task = group.tasks.find((task) => task.id === taskId)
        //     })
        //     return task
        // },
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser
        },
    },
    // watch: {
    //     '$route.params.taskId'() {
    //         console.log(this.$route.params.taskId)
    //         const task = this.getTaskById()
    //         console.log('task', task)
    //     },
    // },
    components: {
        taskPosts,
        taskActivities,
    },
}
</script>
