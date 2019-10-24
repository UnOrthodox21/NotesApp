
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

window.VueRouter=require('vue-router').default;

window.VueAxios=require('vue-axios').default;

window.Axios=require('axios').default;

let AppLayout = require('./components/App.vue');


Vue.use(VueRouter, VueAxios, axios);

// importing Modules
import NotesApp from './components/NotesApp.vue';
import NotesList from './components/NotesList.vue';
import EditNote from './components/EditNote.vue';




const routes = [
    {
        name: 'NotesApp',
        path: '/',
        component: NotesApp
    },
    {
        name: 'NotesList',
        path: '/notes',
        component: NotesList
    },
    {
        name: 'EditNote',
        path: '/notes/edit/:id',
        component: EditNote
    }
];


const router = new VueRouter({ mode: 'history', routes: routes});


new Vue(Vue.util.extend(
    { router },
     AppLayout
     )
    ).$mount('#app');


/*
const router = new VueRouter({ 
    routes 
});

const app = new Vue({ 
    router 
}).$mount('#app');
*/

/* const app = new Vue({
    el: '#app',
});
*/