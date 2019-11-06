
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master.vue'
import { store } from './store/store'
import CxltToastr from 'cxlt-vue2-toastr'



var toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}


window.eventBus = new Vue()

Vue.config.devtools = true;


Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.use(CxltToastr, toastrConfigs)


const router = new VueRouter ({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.loggedIn) {
        next({
          name: 'login',
        })
      } else {
        next()
      }
    }  else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters.loggedIn) {
          next({
            name: 'tasks',
          })
        } else {
          next()
        }
    } else {
        next()
    }
  })



new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { Master },
  template: '<Master/>'
})












// window.Vue = require('vue');

// window.VueRouter=require('vue-router').default;

// window.VueAxios=require('vue-axios').default;

// window.Axios=require('axios').default;


// let AppLayout = require('./app.vue').default;


// Vue.use(VueRouter, VueAxios, axios);

// // importing Modules

// const NotesApp  = Vue.component('NotesApp', require('./components/NotesApp.vue').default);
// const NoteList  = Vue.component('NoteList', require('./components/NoteList.vue').default);
// const NotesList  = Vue.component('NotesList', require('./components/NotesList.vue').default);
// const EditNote =  Vue.component('EditNote', require('./components/NotesList/EditNote.vue').default);
// const DeleteNote =  Vue.component('DeleteNote', require('./components/NotesList/DeleteNote.vue').default);
// const ViewNote =  Vue.component('ViewNote', require('./components/NotesList/ViewNote.vue').default);




// const routes = [
//     {
//         name: 'NoteList',
//         path: '/',
//         component: NoteList
//     },
//     {
//         name: 'NotesList',
//         path: '/notes',
//         component: NotesList
//     },
//     {
//         name: 'EditNote',
//         path: '/notes/edit/:id',
//         component: EditNote
//     },
//     {
//         name: 'DeleteNote',
//         path: '/notes/delete/:id',
//         component: DeleteNote
//     },
//     {
//         name: 'ViewNote',
//         path: '/notes/view/:id',
//         component: ViewNote
//     }
// ];


// const router = new VueRouter({ mode: 'history', routes: routes});


// new Vue(Vue.util.extend(
//     { router },
//      AppLayout
//      )
//     ).$mount('#app');


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