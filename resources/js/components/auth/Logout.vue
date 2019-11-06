<template>


</template>


<script>
export default {
    created() {
        this.$store.dispatch('clearTasks')
        this.$store.dispatch('destroyToken')
          .then(response => {
                this.$router.push({ name: 'home' })
        })
    }
}
</script>