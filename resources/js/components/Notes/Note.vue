  <template>
        <div class="col-8 mx-0 my-5 p-5 note">
            <div v-if="note">
                <label for="title">Title:</label>
                <input type="text" v-model="note.title" class="title" name="title" placeholder="Enter a title" />
                <label for="content">Content:</label>
                <textarea class="content" name="content" v-model="note.content" placeholder="Enter some content"></textarea>
                <button class="delButton" @click="deleteNote()">DELETE NOTE</button>
                <button class="saveButton" @click="saveNote()">SAVE NOTE</button>
            </div>
        </div>
    </template>

    <script>
      export default {
        name: 'Note',
        props: ['note'],
        methods: {
          deleteNote () {
            this.$emit('delete-note')
          },
          saveNote () {
            this.$emit('save-note')
          }
        }
      }
    </script>

    <style scoped>
    

        .content, .title {
            background-color: #C3D4F2;
            border-radius: 0.25em;
            border: solid 2px #233b5d;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 0.5em;
        }

        .content:focus, .title:focus {
            outline: 0;
        }

        .content {
            resize: vertical;
            font-size: 1.5em;
            padding: 0.5em;
            height: 15em;
        }

        .title {
            font-size: 2em;
            padding: 0.4em 0.6em;
        }

        label {
            color: #C3D4F2;
            margin-bottom: 0.5em;
            display: inline-block;
            font-size: 1.25em;
        }

        button {
            border-style: solid; 
            border-width: 2px;
            border-radius: 0.7em;
            border-color: #233b5d;
            padding: 0.5em 0.7em;
            margin-right: 0.7em;
            font-weight: bold;
            color: white;
            font-size: 1.5em;
            cursor: pointer;
        }


        .saveButton {
            background-color: #1FA83A;
        }

        .delButton {
            background-color: #CA1515;
        }

        .saveButton:hover {
            background-color: #24BA42;
        }

        .delButton:hover {
            background-color: #DF1A1A;
        }


    </style>
	