<template>
  <div class="container-fluid appInterface m-0 p-0" id="app" >
    <div class="row">
       

        <table class="table mx-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Note Title</th>
                    <th scope="col">Note Content</th>
               
                </tr>
            </thead>
            <tbody>
                <tr v-for="(note, index) in filteredNotes">
                    <td>{{ index +1 }}</td>
                    <td>{{ note.title }}</td>
                    <td> {{ note.content }}</td>
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
    }
}
</script>






<style lang="css">

th {
    background-color: white;
    color: #233b5d;
    border: 3px solid #233b5d;
    font-size: 1.1em;
}

</style>