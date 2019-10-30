<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: 'task-remaining',
  computed: {
    remaining() {
      return this.$store.getters.remaining
    }
  }
}
</script>