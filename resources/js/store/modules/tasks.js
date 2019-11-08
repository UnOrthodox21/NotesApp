export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

namespaced: true;

const state =  {
    tasks: [],
    filter: 'all'
  };

  
const getters = {

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
  };



const mutations = {

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
   
  };



 const actions =  {

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
  };