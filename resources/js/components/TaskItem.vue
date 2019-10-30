<template>
  <div class="task-item">
    <div class="task-item-left">
        <input type="checkbox" v-model="completed" @change="doneEdit">
        <div v-if="!editing" @dblclick="editTask" class="task-item-label" :class="{ completed : completed }">{{ title }}</div>
        <input v-else class="task-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div> <!-- end task-item-left -->
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTask(task.id)">
        &times;
      </span>
    </div>
  </div> <!-- end task-item -->
</template>

<script>
export default {
  name: 'task-item',
  props: {
    task: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.task.id,
      'title': this.task.title,
      'completed': this.task.completed,
      'editing': this.task.editing,
      'beforeEditCache': '',
    }
  },
  created() {
    eventBus.$on('pluralize', this.handlePluralize)
  },
  beforeDestroy() {
    eventBus.$off('pluralize', this.handlePluralize)
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.task.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTask(id) {
      this.$store.dispatch('deleteTask', id)
    },
    editTask() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTask', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
    pluralize() {
      eventBus.$emit('pluralize')
    },
    handlePluralize() {
      this.title = this.title + 's'
      this.$store.dispatch('updateTask', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    }
  }
}
</script>