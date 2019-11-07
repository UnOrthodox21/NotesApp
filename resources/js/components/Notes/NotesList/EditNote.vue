<template>
<div class="container-fluid mx-5 px-0 text-center">
 
    <h3>Edit Note</h3>
    <form v-on:submit.prevent = "updateNote">
        <div class="form-group">
            <label for="edit-title">Title</label>
            <input id="edit-title" v-model="note.title" class="form-control" required />
        </div>
        <div class="form-group">
            <label for="edit-content">Content</label>       
            <textarea class="form-control" rows="10" v-model="note.content"></textarea>
        </div>
        <button type="submit" class="btn btn-xs btn-primary">Edit Note</button>
        <router-link class="btn btn-xs btn-warning" v-bind:to="'/'">Cancel</router-link>
    </form>

</div>
</template>




<script>
export default {


    data: function() {
        return { note: {title: '', content: ''}}
    },
    created: function() {
        let uri = 'http://notes.docker.lv/notes/'+this.$route.params.id;
        Axios.get(uri).then((response) => {
            this.note = response.data;
        });
    },

    methods: {
        updateNote: function() {

        let uri = 'http://notes.docker.lv/notes/'+this.$route.params.id;
        Axios.patch(uri, this.note).then((response) => {
        this.$router.push({ name: 'NotesList' })
        });
    }
 }
}








</script>

<style>

</style>