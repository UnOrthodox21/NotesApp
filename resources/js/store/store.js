import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://notes.docker.lv/api'

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    tasks: []
  },
  getters: {
    remaining(state) {
      return state.tasks.filter(task => !task.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
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
    checkAll(state, checked) {
      state.tasks.forEach(task => (task.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter(task => !task.completed)
    },
    retrieveTasks(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    retrieveTasks(context) {
      axios.get('/tasks')
      .then(response => {
        context.commit('retrieveTasks', response.data)
      })
      .catch(error => {
        console.log(error)
      })
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
    checkAll(context, checked) {
      axios.patch('/tasksCheckAll', {
       completed: checked,
      })
      .then(response => {
        context.commit('checkAll', checked)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateFilter(context, filter) {
        context.commit('updateFilter', filter)
    },
    clearCompleted(context) {

      const completed = store.state.tasks
      .filter(task => task.completed)
      .map(task => task.id)

      axios.delete('/tasksDeleteCompleted', {
        data: {
          tasks: completed
        }
      })
      .then(response => {
        context.commit('clearCompleted')
      })
      .catch(error => {
        console.log(error)
      })

    }
  }
})