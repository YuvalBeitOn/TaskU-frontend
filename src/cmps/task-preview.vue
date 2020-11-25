<template>
  <li class="task-preview">
<<<<<<< HEAD
    <pre>{{ task }}</pre>
    <span>{{ task.name }}</span>
    <span><i class="far fa-comment"></i></span>
    <span><i class="far fa-user-circle"></i></span>
    <span>{{ task.status }}</span>
    <span>{{ task.priority }}</span>
=======
    <h3>Task Preview:</h3>
    <pre>{{ task }}</pre>
>>>>>>> a1a6a1c92b064a31033bf515d0a27cf966e1eb7e
  </li>
</template>

<script>
export default {
  name: 'task-preview',
  props: {
    task: Object,
  },
};
</script>
