<template>
  <button v-if="showClearCompletedButton" class="btn-tasks btn-tasks-clear" @click="clearCompletedTasks">Clear Completed</button>
</template>

<script>
export default {
  name: 'task-clear-completed',
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    clearCompletedTasks() {
      this.$store.dispatch('clearCompletedTasks')
    }
  }
}
</script>
