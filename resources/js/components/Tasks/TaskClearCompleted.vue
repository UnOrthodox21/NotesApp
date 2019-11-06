<template>
  <button v-if="showClearCompletedButton" @click="clearCompletedTasks">Clear Completed</button>
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
