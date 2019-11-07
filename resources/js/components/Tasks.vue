<template>
<div class="page-wrapper container-fluid">
<transition name="fade">
 <tasks-app></tasks-app>
</transition>
</div>
</template>


<script>
import TasksApp  from './Tasks/TasksApp'

export default {
 name: "Tasks",
 components: {
   TasksApp
 }
}

</script>


<style>
</style>