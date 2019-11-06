<template>
<div class="page-wrapper container-fluid">
<transition name="fade">
 <task-list></task-list>
</transition>
</div>
</template>


<script>
import TaskList  from './Tasks/TaskList'

export default {
 name: "Tasks",
 components: {
   TaskList
 }
}

</script>


<style>
</style>