<template>
<div class="container-fluid mx-0 px-0">
<transition name="fade">
<router-view></router-view>
</transition>
</div>
</template>


<script>
export default {
  mounted() {
    console.log('Component mounted.')
  }
}
</script>