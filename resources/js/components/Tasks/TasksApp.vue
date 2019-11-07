<template>
  <div class="container-fluid my-3 px-5">
      <h1 class="pageHeader text-center my-5">Tasks</h1>
    <input type="text" class="task-input" placeholder="What needs to be done" v-model="newTask" @keyup.enter="addTask">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <task-item v-for="task in tasksFiltered" :key="task.id" :task="task" :checkAll="!anyRemainingTasks">
    </task-item>
    </transition-group>

    <div class="extra-container">
      <task-check-all></task-check-all>
      <task-items-remaining></task-items-remaining>
    </div> <!-- end extra-container -->

    <div class="extra-container">
      <task-filtered></task-filtered>

      <div>
        <transition name="fade">
        <task-clear-completed></task-clear-completed>
        </transition>
      </div>
    </div> <!-- end extra-container -->
  </div>
</template>

<script>
import TaskItem from './TaskItem'
import TaskItemsRemaining from './TaskItemsRemaining'
import TaskCheckAll from './TaskCheckAll'
import TaskFiltered from './TaskFiltered'
import TaskClearCompleted from './TaskClearCompleted'
export default {
  name: 'tasks-app',
  components: {
    TaskItem,
    TaskItemsRemaining,
    TaskCheckAll,
    TaskFiltered,
    TaskClearCompleted,
  },
  data() {
    return {
      newTask: '',
   
    }
  },
  created() {
    this.$store.dispatch('retrieveTasks')
  },
  computed: {
    anyRemainingTasks() {
      return this.$store.getters.anyRemainingTasks
    },
    tasksFiltered() {
      return this.$store.getters.tasksFiltered
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return
      }
      this.$store.dispatch('addTask', {
        id: this.idForTask,
        title: this.newTask,
      })
      this.newTask = ''
      this.idForTask++
    },
  }
}
</script>

<style>

    .task-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 1.5em;
        margin-bottom: 16px;
        outline: 0;

    &:focus {
        outline: 0;
    }

    }

    .task-item {
        font-size: 1.3em;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        cursor: pointer;
        font-size: 2em;
        margin-left: 14px;
    }


     .remove-item:hover {
        color: #ff3337;
    }

    .task-item-left {
        display: flex;
        align-items: center;
    }

    .task-item-label {
        font-size: 24px;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: none;
    }

textarea:focus, input:focus{
    outline-style: solid;
    outline-color: #30b8a6;
    outline-width: 2px;
}
    .task-item-edit {
        font-size: 24px;
        background: none;
        color: #30b8a6;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: none;
    }


  .btn-tasks {
    font-size: 1.75em;
    background-color: white;
    color: rgb(15, 29, 44);
    border-radius: 7.5%;
}


  .btn-tasks:hover {
    background-color: #233b5d;
    color: white;
    border-color: #233b5d;
}

  .btn-tasks:focus {
      outline: none;
    }


  .btn-tasks-clear:hover {
    color: #ff3337;
  }

  .active {
    background: #233b5d;
    border-color: #233b5d;
    color: #30b8a6;
  }

  .active:hover {
    background-color:#233b5d;
  }


    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
    }


     .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }



</style>