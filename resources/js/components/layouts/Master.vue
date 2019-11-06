<template>
   
<div id="app" class="container-fluid mx-0 px-0">



<nav class="navbar navbar-expand-lg navbar-dark m-0">
    <router-link class="navbar-brand ml-2" :to="{ name: 'home' }">Notes</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'tasks' }">Tasks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'notes' }">Notes</router-link>
          </li>
        <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
          </li>
          <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li v-if="!loggedIn"  class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>
             <li v-if="loggedIn"  class="nav-item">
            <router-link class="nav-link" :to="{ name: 'logout' }">Log Out</router-link>
          </li>
  
   </ul>
   
    </div>
  </nav>



<transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
<router-view></router-view>
</transition>


</div>

</template>


<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>

<style>

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .page-wrapper {
      animation-duration: 0.25s;
    }


</style>
  



