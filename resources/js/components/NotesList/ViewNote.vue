<template>
<div class="container-fluid mx-3">
    <h3>{{ note.title }}</h3>
    <strong>Body : </strong>
    <div>
        {{ note.content }}
    </div>
    </br>
    <span class="glyphicon glyphicon-arrow-left"></span>
    <router-link v-bind:to="'/notes'">Back to notes list</router-link>
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
    }
}
</script>



<style>


</style>