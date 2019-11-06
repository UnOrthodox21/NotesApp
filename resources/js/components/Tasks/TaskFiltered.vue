<template>
  <div>
    <button :class="{ active: taskFilter == 'all' }" @click="changeFilter('all')">All</button>
    <button :class="{ active: taskFilter == 'active' }" @click="changeFilter('active')">Active</button>
    <button :class="{ active: taskFilter == 'completed' }" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: 'task-taskFiltered',
  computed: {
    taskFilter() {
      return this.$store.state.taskFilter
    }
  },
  methods: {
    changeFilter(taskFilter) {
      this.$store.dispatch('updateTasksFilter', taskFilter)
    }
  }
}
</script>
