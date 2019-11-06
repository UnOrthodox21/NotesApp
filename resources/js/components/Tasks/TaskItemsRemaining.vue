<template>
  <div>{{ remainingTasks }} items left</div>
</template>

<script>
export default {
  name: 'task-remaining',
  computed: {
    remainingTasks() {
      return this.$store.getters.remainingTasks
    }
  }
}
</script>