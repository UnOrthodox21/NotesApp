export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const state =  {
    token: localStorage.getItem('access_token') || null,
 };

  
const getters = {

// Auth Getters

    loggedIn(state) {
      return state.token != null
    },


};




const mutations = {


// Auth Mutations

retrieveToken(state, token) {
  state.token = token;
},


destroyToken(state) {
  state.token = null;
},


};


 const actions =  {


// Auth Actions


    register(context, data) {
      return new Promise((resolve, reject) => {

        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    },


   retrieveToken(context, credentials) {

    return new Promise((resolve, reject) => {

    axios.post('/login', {
      username: credentials.username,
      password: credentials.password,
    })
    .then(response => {
      const token = response.data.access_token

      localStorage.setItem('access_token', token)
      context.commit('retrieveToken', token)
      resolve(response)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })
  })
  },

  destroyToken(context) {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token


    if(context.getters.loggedIn) {

      return new Promise((resolve, reject) => {

        axios.post('/logout')
        .then(response => {
    
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
          resolve(response)
        })
        .catch(error => {
          localStorage.removeItem('access_token')
          context.commit('destroyToken')
          reject(error)
        })
      })
    }

  },

  retrieveName(context) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
   
    return new Promise((resolve, reject) => {

      axios.get('/user')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
};

