import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './modules/auth'
import tasks from './modules/tasks'
import notes from './modules/notes'


Vue.use(Vuex);
const namespaced = true
axios.defaults.baseURL = 'http://notes.docker.lv/api';

export default new Vuex.Store({
  namespaced,
  modules: {
    auth,
    tasks,
    notes
  }
})