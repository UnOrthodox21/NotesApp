<template>
  <div class="container-fluid my-3 px-5">
    <input type="text" class="task-input" placeholder="What needs to be done" v-model="newTask" @keyup.enter="addTask">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <task-item v-for="task in tasksFiltered" :key="task.id" :task="task" :checkAll="!anyRemaining">
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
  name: 'task-list',
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
      idForTask: 3,

    }
  },
  created() {
    this.$store.dispatch('retrieveTasks');
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
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

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .task-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 1.5em;
        margin-bottom: 16px;
    }


    &:focus {
        outline: 0;
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
        margin-left: 14px;
        &:hover {
            color: black;
        }
    }


     .remove-item:hover {
        color: red;
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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        padding: 10px;
        border: 1px solid lightblue;
    }

    .task-item-edit {
        font-size: 24px;
        background: none;
        color: white;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

    &:hover {
        background: lightgreen;
    }

    &:focus {
        outline: none;
    }


    .active {
        background: lightgreen;
    }

     .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }



</style>