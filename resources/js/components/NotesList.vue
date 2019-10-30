<template id="NoteList">
<div class="container-fluid mx-0 px-0">
    <div class="row mx-0 px-0">
   
        <table class="table mx-0 px-0">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User ID</th>
                    <th>Note Title</th>
                    <th>Note Content</th>
                    <th>Commands</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(note, index) in filteredNotes">
                    <td>{{ index +1 }}</td>
                    <td>{{ note.user_id }}</td>
                    <td>{{ note.title }}</td>
                    <td> {{ note.content }}</td>
                     <td>
                     <router-link class="btn btn-primary btn-xs" v-bind:to="{name: 'ViewNote', params: {id: note.id}}">View</router-link>
                     <router-link class="btn btn-success btn-xs" v-bind:to="{name: 'EditNote', params: {id: note.id}}">Edit</router-link>
                     <router-link class="btn btn-danger btn-xs" v-bind:to="{name: 'DeleteNote', params: {id: note.id}}">Delete</router-link>

                     </td>
                </tr>
            </tbody>
        </table>


</div>
</div>



</template>


<script>
export default {

    
    data: function() {
        return {notes: ''};
    },
    created: function() {
        let uri = 'http://notes.docker.lv/notes/';
        Axios.get(uri).then((response) => {
            this.notes = response.data;
        });
    },


    computed: {
        filteredNotes: function() {
            if(this.notes.length) {
                return this.notes;
            }
        }
    },

    methods: {


        deleteNote: function(id) {
          let uri = 'http://notes.docker.lv/notes/';
          Axios.destroy(uri, id);
          Axios.get(uri).then((response) => {
            this.notes = response.data;
          });

        },
        
    }

}
</script>






<style lang="css">

th {
    background-color: white;
    color: #233b5d;
    border: 3px solid #233b5d;
    font-size: 1.5em;
}

td {
    color: white;
    font-size: 1.3em;
}

</style>