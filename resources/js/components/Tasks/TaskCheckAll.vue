<template>
  <div><label><input type="checkbox" :checked="!anyRemainingTasks" @change="allChecked"> Check All</label></div>
</template>

<script>
export default {
  name: 'task-check-all',
  computed: {
    anyRemainingTasks() {
      return this.$store.getters['tasks/anyRemainingTasks']
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch('tasks/checkAllTasks', event.target.checked)
    }
  }
}
</script>
