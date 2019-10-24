<template>
  <div class="container-fluid appInterface m-0 p-0" id="NotesApp" >
        <div class="row h-100 m-0 p-0 appRow">
          <Navigation @change-note="changeNote" @new-note="newNote" :notes="notes" :activeNote="index" />
          <Note @save-note="saveNote" @delete-note="deleteNote" :note="notes[index]" />
        </div>
         <div class="row h-100 m-0 p-0 appRow">
              <router-link class="btn btn-m btn-primary manageNotes ml-auto" v-bind:to="{name: 'NotesList' }">Manage all Notes</router-link>
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
    import Navigation from './NotesApp/Navigation.vue'
    import Note from './NotesApp/Note.vue'

    export default {
      components: {
        Navigation,
        Note
      },
   data: function() {
        return {notes: '', index: 0};
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
        newNote () {
          this.notes.push({
            title: `${this.notes.length+1}. Note`,
            content: ''
          })
          this.index = this.notes.length - 1
        },
        changeNote (index) {
          this.index = index
        },
        saveNote () {
           // nothing as of yet
        },
        deleteNote () {
          this.notes.splice(this.index, 1)
          this.index = Math.max(this.index - 1, 0)
        }
      }
    }
    </script>

    <style>
      html, body, #NotesApp {
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


    
