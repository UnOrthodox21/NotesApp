<template>
  <div><label><input type="checkbox" :checked="!anyRemainingTasks" @change="allChecked"> Check All</label></div>
</template>

<script>
export default {
  name: 'task-check-all',
  computed: {
    anyRemainingTasks() {
      return this.$store.getters.anyRemainingTasks
    }
  },
  methods: {
    allChecked() {
      this.$store.dispatch('checkAllTasks', event.target.checked)
    }
  }
}
</script>
