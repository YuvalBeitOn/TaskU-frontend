<template>
  <li class="task-preview">
<<<<<<< HEAD
    <h3>Task Preview:</h3>
    <pre>{{ task }}</pre>
=======
    <pre>{{ task }}</pre>
    <span>{{ task.name }}</span>
    <span><i class="far fa-comment"></i></span>
    <span><i class="far fa-user-circle"></i></span>
    <span>{{ task.status }}</span>
    <span>{{ task.priority }}</span>
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
  </li>
</template>

<script>
export default {
<<<<<<< HEAD
  name: "task-preview",
  props: {
    task: Object
  }
=======
  name: 'task-preview',
  props: {
    task: Object,
  },
>>>>>>> 7b84609878a17cacd584019e8a33014af1fdc2ce
};
</script>
