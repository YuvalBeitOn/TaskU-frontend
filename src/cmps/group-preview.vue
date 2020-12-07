<template>
    <section class="group-preview-container relative">
        <div
            @mouseover="showDragBtn"
            @mouseleave="hideDragBtn"
            class="group-control"
        >
            <div class="expand-btn-container">
                <button
                    :style="getStyleStr(group.color)"
                    class="expand-btn"
                    @click.stop="toggleGroupActions"
                >
                    <i
                        class="expand-arrow fas fa-arrow-down"
                        v-tooltip.right="'Actions'"
                    ></i>
                </button>
            </div>
            <button v-show="isGroupHovering" class="drag-btn">
                <i
                    class="fas fa-arrows-alt drag-icon"
                    v-tooltip.right="'Drag group'"
                ></i>
            </button>
        </div>
        <li
            :class="{
                'group-preview width100 flex space-between align-center ': true,
                expanded: expanded,
            }"
            @click="expandGroup"
        >
            <h4
                :class="{
                    'group-headers group-name editable': true,
                    hovering: isGroupHovering,
                }"
                spellcheck="false"
                ref="groupName"
                :style="groupColor"
                @mouseover="showDragBtn"
                @mouseleave="hideDragBtn"
                @blur="updateGroupName"
                @keydown.enter="updateGroupName"
                contenteditable
            >
                {{ groupCopy.name }}
            </h4>

            <popup-menu
                v-if="isActionsShowen"
                @closePopup="toggleGroupActions"
                :menuItems="popupOptions"
            />
            <colors-menu v-if="isColorsShowen" @setColor="setGroupColor" />
            <span v-if="!isExpanded">{{ tasksCount }}</span>
            <div v-if="isExpanded" class="flex space-between align-center">
                <div class="group-headers headers flex">
                    <h4 class="list-title">Members</h4>
                    <h4 class="list-title t-status">Status</h4>
                    <h4 class="list-title t-priority">Priority</h4>
                    <h4 class="list-title t-date">Due Date</h4>
                </div>
            </div>
            <task-list
                :taskColor="group.color"
                v-if="isExpanded && groupCopy.tasks && groupCopy.id"
                :tasks="groupCopy.tasks"
                :groupId="groupCopy.id"
                @forceRender="emitForceRender"
            />
            <div class="progress-bar-section flex">
                <progress-bar :progressBarData="progressBarData" />

                <progress-bar :progressBarData="progressBarPrio" />
            </div>
        </li>
        <div
            class="back-drop-layer"
            v-if="isActionsShowen || isColorsShowen"
            @click.stop="closePopUps"
        ></div>
    </section>
</template>

<script>
import progressBar from '@/cmps/progress-bar'
import taskList from './task-list.vue'
import popupMenu from './popup-menu'
import colorsMenu from './colors-menu'
// import { eventBus } from '@/services/event-bus.service'
import { boardService } from '../services/board.service'

export default {
    name: 'group-preview',
    props: {
        group: Object,
        deleteGroup: Function,
    },
    data() {
        return {
            isGroupHovering: false,
            isExpanded: true,
            groupCopy: null,
            isActionsShowen: false,
            isColorsShowen: false,
            popupOptions: [
                {
                    txt: 'Expand',
                    func: this.expandGroup,
                    iconStr: 'expand-alt',
                },
                {
                    txt: 'New Task',
                    func: this.addNewTask,
                    iconStr: 'plus',
                },
                {
                    txt: 'Delete',
                    func: this.emitDelete,
                    iconStr: 'trash',
                },
                {
                    txt: 'Change Color',
                    func: this.toggleColorsMenu,
                    iconStr: 'paint-brush',
                },
                {
                    txt: 'Duplicate',
                    func: this.duplicateGroup,
                    iconStr: 'copy',
                },
            ],
        }
    },
    methods: {
        showDragBtn() {
            this.isGroupHovering = true
        },
        hideDragBtn() {
            this.isGroupHovering = false
        },
        closePopUps() {
            this.isActionsShowen = false
            this.isColorsShowen = false
        },
        addNewTask() {
            const newTask = boardService.getEmptyTask()
            this.groupCopy.tasks.push(newTask)
            this.$emit('updateGroup', this.groupCopy)
        },
        focusGroupName() {
            this.$refs.groupName.focus()
            this.isActionsShowen = false
        },
        getStyleStr(colorStr) {
            return `backgroundColor:${colorStr}`
        },
        duplicateGroup() {
            console.log('here');
            this.$emit('duplicateGroup', this.groupCopy)
        },
        emitForceRender() {
            this.$emit('emitForceRender')
        },
        toggleColorsMenu() {
            this.isColorsShowen = !this.isColorsShowen
        },
        toggleGroupActions() {
            this.isActionsShowen = !this.isActionsShowen
        },
        emitDelete() {
            this.$emit('deleteGroup', this.groupCopy.id)
            this.isExpanded = false
        },
        toggleGroup() {
            this.isExpanded = !this.isExpanded
            this.isActionsShowen = false
        },
        expandGroup() {
            this.isExpanded = true
            this.isActionsShowen = false
        },
        setGroupColor(color) {
            this.isActionsShowen = false
            this.groupCopy.color = color
            this.isColorsShowen = false
            this.$emit('updateGroup', this.groupCopy)
        },
        updateGroupName(ev) {
            ev.target.blur()
            if (ev.target.innerText === this.groupCopy.name) return
            else {
                this.groupCopy.name = ev.target.innerText
                this.$emit('updateGroup', this.groupCopy)
            }
        },
    },
    computed: {
        progressBarData() {
            let statusPercentageMap = this.group.tasks.reduce((acc, task) => {
                if (!acc[task.status.txt])
                    acc[task.status.txt] = {
                        count: 0,
                        statusColor: task.status.color,
                    }
                acc[task.status.txt].count++
                return acc
            }, {})
            const totalSum = this.group.tasks.length
            for (let key in statusPercentageMap) {
                statusPercentageMap[
                    key
                ].fraction = `${statusPercentageMap[key].count} / ${totalSum}`
                statusPercentageMap[key].percentage =
                    (statusPercentageMap[key].count / totalSum) * 100
                statusPercentageMap[key].name = key
            }
            return statusPercentageMap
        },
        progressBarPrio() {
            let priorityPercentageMap = this.group.tasks.reduce((acc, task) => {
                if (!acc[task.priority.txt])
                    acc[task.priority.txt] = {
                        count: 0,
                        statusColor: task.priority.color,
                    }
                acc[task.priority.txt].count++
                return acc
            }, {})
            const totalSum = this.group.tasks.length
            for (let key in priorityPercentageMap) {
                priorityPercentageMap[
                    key
                ].fraction = `${priorityPercentageMap[key].count} / ${totalSum}`
                priorityPercentageMap[key].percentage =
                    (priorityPercentageMap[key].count / totalSum) * 100
                priorityPercentageMap[key].name = key
            }
            return priorityPercentageMap
        },
        tasksCount() {
            return `${this.groupCopy.tasks.length} items`
        },
        expanded() {
            return this.isExpanded ? true : false
        },
        groupColor() {
            return { color: this.groupCopy.color }
        },
        board() {
            return this.$store.getters.board
        },
    },
    created() {
        this.groupCopy = this.group
    },
    components: {
        taskList,
        colorsMenu,
        progressBar,
        popupMenu,
    },
}
</script>
