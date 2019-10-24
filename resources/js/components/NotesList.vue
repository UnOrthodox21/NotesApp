<template id="note-list">
    <div class="row">
        <div class="pull-right">
            <router-link class="btn btn-xs btn-primary">
                <span class="glyphicon glyphicon-plus"></span>
                     Add new Note
            </router-link>
            <br></br>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Note Title</th>
                    <th>Note Content</th>
                    <th class="col-md-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(note, index) in filteredNotes">
                    <td>{{ index + 1 }}</td>
                    <td>{{ note.title }}</td>
                    <td> {{ note.content }}</td>
                    <td>
                    <router-link class="btn btn-info btn-xs" v-bind:to="{name: 'EditNote', params: {id: note.id}}">Edit</router-link>
                    </td>
                </tr>
            
            </tbody>
        
        </table>
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
                return this.posts;
            }
        }
    }
}
</script>


<style lang="css">
</style>