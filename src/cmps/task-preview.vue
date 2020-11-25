<template>
  <li class="task-preview">
    <pre>{{ task }}</pre>
    <span>{{ task.name }}</span>
    <span><i class="far fa-comment"></i></span>
    <span><i class="far fa-user-circle"></i></span>
    <span>{{ task.status }}</span>
    <span>{{ task.priority }}</span>
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
