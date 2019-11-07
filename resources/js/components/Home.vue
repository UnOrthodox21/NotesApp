<template>
  <div class="container-fluid page-wrapper text-center mt-5 pt-5 px-5">

        <h1 class="pageHeader welcomeMessage my-5 py-5">Welcome to my application!</h1>
            
            <h2 v-if="!loggedIn" class="statusNotification mt-5 pt-3">As a guest you can:</h2>
            <h2 v-if="loggedIn" class="statusNotification mt-5 pt-3">As an authorized user you can:</h2>
        <div class="row mx-auto my-5 py-5 px-0">
            <div class="col-6 mx-auto px-0 pt-5">
               <router-link :to="{ name: 'notes' }"><button class="btn btn-primary btn-home p-4" >Manage Notes</button></router-link>
            </div>
             <div v-if="loggedIn" class="col-6 mx-auto px-0 pt-5">
               <router-link :to="{ name: 'tasks' }"><button class="btn btn-primary btn-home p-4" >Manage Tasks</button></router-link>
            </div>
        
        
        </div>
</div>



</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
  },

}
</script>

<style>

.welcomeMessage {
    font-size: 5em;
}


.statusNotification {
    font-size: 2.5em;
    font-weight: bold;
}


.btn-home {
    background: #233b5d;
    color: white;
    border-color: white;
    border-width: 4px;
    font-size: 2.5em;
    border-radius: 17%;
}



.btn-home:hover {
    background: #233b5d;
    border-color: #30b8a6;
    color: #30b8a6;

}





</style>