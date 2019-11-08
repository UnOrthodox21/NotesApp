<template>



<div class="page-wrapper col-12 col-md-3  loginContainer text-center mx-auto mt-5 py-5">
    
    <h2 class="auth-heading mt-5">Register</h2>

       <div v-if="serverErrors" class="server-error">
            <div v-for="(value, key) in serverErrors" :key="key">
                {{ value[0] }}
            </div>
        </div>

    <form action='#' @submit.prevent="register">
    
        <div class="form-group mt-5">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control login-input" v-model="name">
        </div>

          <div class="form-group">
            <label for="email">E-Mail</label>
            <input type="email" name="email" id="email" class="form-control login-input" v-model="email">
        </div>

        <div class="form-group">
            <label for="email">Password</label>
            <input type="password" name="password" id="password" class="form-control login-input" v-model="password">
        </div>
    
    <div class="form-group">
        <button type="submit" class="btn btn-primary login-button mt-4 w-100">Register</button>
    </div>
    
    
    </form>
</div>
</template>




<script>
export default {
    data() {
     return {
         name: '',
         email: '',
         password: '',
         serverErrors: '',
         successMessage: '',
     }
   },
    methods: {

        register() {
        this.$store.dispatch('auth/register', {
            name: this.name,
            email: this.email,
            password: this.password,
         })
        .then(response => {
            this.successMessage = 'Registered Successfully!'
            this.$router.push({ name: 'login', params: { 
            dataSuccessMessage: this.successMessage } })
              this.$toast.success({
            title: this.successMessage,
            message: 'You can login here'
        })
            })
            .catch(error => {
                this.serverErrors = Object.values(error.response.data.errors);
            })
        }
    }
}
</script>




<style>

label {
    font-size: 1.5em;
}

.loginContainer {
   background-color: none;
}

.login-heading {
    font-size: 3em;
}

.login-input {
    text-align: center;
    font-size: 1.5em;
}

.login-button {
    font-size: 1.5em;
    background-color: #233b5d;
    border-color: white;
    border-width: 0.1em;
    border-radius: 5%;
}

.login-button:hover {
    background-color: #233b5d;
    color: #30b8a6;
    border-color: #30b8a6;
}

</style>