 <template>
        <div class="col-4 p-0 m-0 notelist">
            <ul>
                <li v-for="(note, index) of notes" class="note" v-bind:class="{ 'active': index === activeNote }" @click="changeNote(index)">
                    <div>{{note.title}}</div>
                </li>
                <li class="new-note" @click="newNote()">+</li>
            </ul>
        </div>
    </template>

    <script>
      export default {
        name: 'Notelist',
        props: ['notes', 'activeNote'],
        methods: {
          changeNote (index) {
            this.$emit('change-note', index)
          },
          newNote () {
            this.$emit('new-note')
          }
        }
      }
    </script>



    <style scoped>

        .notelist {
              min-height: 100%;
              height: 100%;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
        }

        li {
            background-color: #C3D4F2;
            color: black;
            padding: 0.25em;
            font-size: 1.5em;
            border-style: solid;
            border-width: 2px;
            border-color: #233b5d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        li:hover {
            cursor: pointer;
            background-color: #B2CAF3;
        }

        .active {
            background-color: white;
        }

        .active:hover {
            background-color: white;
        }

        .new-note {
            background-color: #C3D4F2;
            color: #233b5d;
            position: absolute;
            font-size: 2.2em;
            padding: 0em;
            width: 100%;
            box-sizing: border-box;
            border-style: solid;
            border-width: 2px;
            border-color: #233b5d;
        }

        .new-note:hover {
            background-color: #B2CAF3;
        }

    </style>
	