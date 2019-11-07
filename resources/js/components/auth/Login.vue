<template>



<div class="page-wrapper col-12 col-md-3 loginContainer text-center mx-auto mt-5 py-5">
    
    <h2 class="auth-heading mt-5 mb-5">Login</h2>

    <form action='#' @submit.prevent="login">

        <div v-if="serverError" class="server-error">{{ serverError }}</div>

       <div v-if="successMessage" class="success-message">
                {{ successMessage }}
        </div>
    
        <div class="form-group mt-2">
            <label for="email">Username/Email</label>
                <input type="email" name="username" id="username" class="form-control login-input" v-model="username">
        </div>

        <div class="form-group">
            <label for="email">Password</label>
                <input type="password" name="password" id="password" class="form-control login-input" v-model="password">
        </div>
    
    <div class="form-group">
        <button type="submit" class="btn btn-primary login-button w-100 mt-4" :disabled="loading">Login
                <div class="lds-css ng-scope" v-if="loading"><div class="lds-eclipse"><div></div></div></div>
        </button>
    </div>
    
    
    </form>
</div>
</template>




<script>
export default {
    name: 'login',
    props: {
        dataSuccessMessage: {
            type: String,
        }
    },
    data() {
        return {
            username: '',
            password: '',
            serverError: '',
            successMessage: this.dataSuccessMessage,
            loading: false,
        }
    },
    methods: {
        login() {
            this.loading = true;
            this.$store.dispatch('retrieveToken', {
                username: this.username,
                password: this.password,
            })
            .then(response => {
                this.loading = false;
                this.$router.push({ name: 'tasks' })
            })
            .catch(error => {
                this.loading = false;
                this.serverError = error.response.data;
                this.password = '',
                this.successMessage = ''
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
}

.login-button:disabled {
    cursor: not-allowed;
}

.server-error {
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    color: #a94442;
    background: #F3DEDE;
    border-radius: 4px;
}

.success-message {
    background-color: #dff0d8;
    color: #3c763d;
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    border-radius: 4px;
}



  @keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-eclipse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.lds-eclipse div {
  position: absolute;
  -webkit-animation: lds-eclipse 1s linear infinite;
  animation: lds-eclipse 1s linear infinite;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 0 0 white;
  -webkit-transform-origin: 80px 82px;
  transform-origin: 80px 82px;
}

.lds-eclipse {
  position: relative;
  display: inline-block;
  width: 25px !important;
  height: 25px !important;
  -webkit-transform: translate(-12.5px, -12.5px) scale(0.125) translate(12.5px, 12.5px);
  transform: translate(-12.5px, -12.5px) scale(0.125) translate(12.5px, 12.5px);
}

</style>