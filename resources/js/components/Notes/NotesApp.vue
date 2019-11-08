<template id="Notes">
  <div class="container-fluid m-0 p-0">
        <div class="row h-100 m-0 p-0 appRow">
          <notes-navigation :notes="retrieveNotes"/>
          <note-form/>
           <router-link class="btn btn-m btn-notes manageNotes ml-auto" :to="{ name: 'notes-list' }">Manage all Notes</router-link>
        </div>
      </div>
</template>

    <script>
    import NotesNavigation from './NotesNavigation.vue'
    import NoteForm from './NoteForm.vue'

    export default {
      name: 'notes-app',
      components: {
        NotesNavigation,
        NoteForm,
      },

      data() {
        return {
          newNote: {
            title: 'Inserted title',
            content: 'Inserted content',
            user_id: 1,
            is_public: 0,
          },
          index: 0,
        };
    },

      created() {
  
   },

   computed: {
  
   },


      methods: {

        addNote() {;

        },

        changeNote(index) {

        },

        saveNote() {

        },

        deleteNote() {

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


    
