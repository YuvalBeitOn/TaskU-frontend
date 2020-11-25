<template>
<<<<<<< HEAD
  <section v-if="tasks" class="task-list">
    <h2>Task List:</h2>
    <ul class="clean list flex wrap align-center justify-center gap">
      <task-preview v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </section>
=======
    <section v-if="tasks" class="task-list">
        <ul class="clean list flex wrap align-center justify-center gap">
            <task-preview
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </ul>
    </section>
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
</template>

<script>
import taskPreview from "@/cmps/task-preview.vue";

export default {
  name: "task-list",
  props: {
    tasks: Array
  },
  methods: {},
  components: {
    taskPreview
  }
};
</script>
