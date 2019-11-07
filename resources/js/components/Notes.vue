<template>
<div class="page-wrapper container-fluid m-0 p-0">
<transition name="fade">
 <notes-app></notes-app>
</transition>
</div>
</template>


<script>
import NotesApp  from './Notes/NotesApp'

export default {
 name: "Notes",
 components: {
   NotesApp
 }
}

</script>


<style>
</style>