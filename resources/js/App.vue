<template>
<div id="app" class="container-fluid">
<transition name="fade">
 <task-list></task-list>
</transition>
</div>
</template>


<script>
import TaskList  from './components/TaskList'

export default {
 name: "App",
 components: {
   TaskList
 }
}

</script>


<style>
</style>