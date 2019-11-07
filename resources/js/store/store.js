import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://notes.docker.lv/api'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    notes: [
      {
        title: 'Say hi', 
        content: 'Hey you', 
        user_id: 2, 
        is_public: 0,
      },
      {
      title: 'Make food', 
      content: 'You have to wash the dishes', 
      user_id: 2, 
      is_public: 0,
      },
      {
      title: 'Clean the room', 
      content: 'You have to clean the room', 
      user_id: 2, 
      is_public: 0,
      },
    ],
    tasks: [],
    filter: 'all'
  },

  
  getters: {

// Auth Getters

    loggedIn(state) {
      return state.token != null
    },


// Notes Getters
  retrieveNotes(state) {
    return state.notes;
  },

// Tasks Getters

    remainingTasks(state) {
      return state.tasks.filter(task => !task.completed).length
    },
    anyRemainingTasks(state, getters) {
      return getters.remainingTasks != 0
    },
    tasksFiltered(state) {
      if (state.filter == 'all') {
        return state.tasks
      } else if (state.filter == 'active') {
        return state.tasks.filter(task => !task.completed)
      } else if (state.filter == 'completed') {
        return state.tasks.filter(task => task.completed)
      }
      return state.tasks
    },
    showClearCompletedButton(state) {
      return state.tasks.filter(task => task.completed).length > 0
    }
  },



  mutations: {


// Auth Mutations

retrieveToken(state, token) {
  state.token = token;
},


destroyToken(state) {
  state.token = null;
},




// Notes Mutations




 // Task Mutations

  clearTasks(state) {
  state.tasks = [];
},

    addTask(state, task) {
      state.tasks.push({
        id: task.id,
        title: task.title,
        completed: false,
        editing: false,
      })
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(item => item.id == task.id)
      state.tasks.splice(index, 1, {
        'id': task.id,
        'title': task.title,
        'completed': task.completed,
        'editing': task.editing,
      })
    },
    deleteTask(state, id) {
      const index = state.tasks.findIndex(item => item.id == id)
      state.tasks.splice(index, 1)
    },
    checkAllTasks(state, checked) {
      state.tasks.forEach(task => (task.completed = checked))
    },
    updateTasksFilter(state, filter) {
      state.filter = filter
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.filter(task => !task.completed)
    },
    retrieveTasks(state, tasks) {
      state.tasks = tasks;
    },
   
  },



  actions: {


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



// Note Actions





// Task Actions

    retrieveTasks(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/tasks')
      .then(response => {
        context.commit('retrieveTasks', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    clearTasks(context) {
      context.commit('clearTasks')
    },
    addTask(context, task) {
      axios.post('/tasks', {
        title: task.title,
        completed: false,
      })
      .then(response => {
        context.commit('addTask', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateTask(context, task) {
      axios.patch('/tasks/' + task.id, {
        title: task.title,
        completed: task.completed,
      })
      .then(response => {
        context.commit('updateTask', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteTask(context, id) {
      axios.delete('/tasks/' + id)
      .then(response => {
        context.commit('deleteTask', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    checkAllTasks(context, checked) {
      axios.patch('/tasksCheckAll', {
       completed: checked,
      })
      .then(response => {
        context.commit('checkAllTasks', checked)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateTasksFilter(context, filter) {
        context.commit('updateTasksFilter', filter)
    },

    clearCompletedTasks(context) {
      const completed = store.state.tasks
      .filter(task => task.completed)
      .map(task => task.id)

      axios.delete('/tasksDeleteCompleted', {
        data: {
          tasks: completed
        }
      })
      .then(response => {
        context.commit('clearCompletedTasks')
      })
      .catch(error => {
        console.log(error)
      })

    },


  }
})