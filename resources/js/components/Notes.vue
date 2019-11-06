<template id="Notes">
  <div class="page-wrapper container-fluid appInterface m-0 p-0" id="NotesApp" >
        <div class="row h-100 m-0 p-0 appRow">
          <Navigation @change-note="changeNote" @new-note="newNote" :notes="notes" :activeNote="index" />
          <Note @save-note="saveNote" @delete-note="deleteNote" :note="notes[index]" />
        </div>
         <div class="row h-100 m-0 p-0 appRow">
              <router-link class="btn btn-m btn-notes manageNotes ml-auto" v-bind:to="{name: 'NotesList' }">Manage all Notes</router-link>
        </div>
      </div>

</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>


    <script>
    import Navigation from './Notes/Navigation.vue'
    import Note from './Notes/Note.vue'

    export default {
      components: {
        Navigation,
        Note
      },

      data: function() {

        return {
          notes: '',
          presetnote: {
            title: 'Inserted title',
            content: 'Inserted content',
            user_id: 1,
            is_public: 1
          },
          index: 0
          };

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

        newNote: function() {

          let uri = 'http://notes.docker.lv/notes/';
          Axios.post(uri, this.presetnote);
          Axios.get(uri).then((response) => {
            this.notes = response.data;
          });

          this.index = this.notes.length;

        },

        changeNote: function(index) {

          this.index = index


        },

        saveNote: function() {
           
        },

        deleteNote: function() {


        },

      }
    }
    </script>








    <style>

      html, body, #Notes {
        height: 100%;
    }

    .appRow {
      min-height: 100%;
      height: 100%;
    }

    .appInterface {
      min-height: 100%;
      height: 100%;
    }

    </style>


    
