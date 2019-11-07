<template>
<div>

    <h3>Delete note {{ note.title }}</h3>
    <form v-on:submit.prevent = "deleteNote">
        <p>This action cannot be undone! Are you sure?</p>
          <button class="btn btn-xs btn-danger" type="submit" name="button">Delete</button>
            <router-link class="btn btn-xs btn-primary" v-bind:to="'/notes'">Back</router-link>
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
        deleteNote: function() {

        let uri = 'http://notes.docker.lv/notes/'+this.$route.params.id;
        Axios.delete(uri, this.note).then((response) => {
        this.$router.push({ name: 'NotesList' })
        });
    }
 }
}








</script>

<style>

</style>