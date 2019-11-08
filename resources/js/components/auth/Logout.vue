<template>


</template>


<script>
export default {
    created() {
        this.$store.dispatch('auth/clearTasks')
        this.$store.dispatch('auth/destroyToken')
          .then(response => {
                this.$router.push({ name: 'home' })
        })
    }
}
</script>