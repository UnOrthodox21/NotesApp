<template>
  <div>
    <button class="btn-tasks" :class="{ active: taskFilter == 'all' }" @click="changeFilter('all')">All</button>
    <button class="btn-tasks" :class="{ active: taskFilter == 'active' }" @click="changeFilter('active')">Active</button>
    <button class='btn-tasks' :class="{ active: taskFilter == 'completed' }" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: 'task-filtered',
  computed: {
    taskFilter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(taskFilter) {
      this.$store.dispatch('updateTasksFilter', taskFilter)
    }
  }
}
</script>


<style>

</style>