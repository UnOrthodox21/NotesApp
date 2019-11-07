import Home from './components/Home'
import Tasks from './components/Tasks'
import Notes from './components/Notes'
import NotesList from './components/Notes/NotesList'
import About from './components/About'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import TestTasksVariable from './components/TestTasksVariable'




const routes = [
    { 
        path: '/', 
        name: 'home',
        component: Home,
    },
    { 
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        meta: {
            requiresAuth: true,
        }
    },
    { 
        path: '/notes',
        name: 'notes',
        component: Notes
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/login', 
        name: 'login',
        component: Login,
        props: true,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/logout', 
        name: 'logout',
        component: Logout
    },
    {
        path: '/register', 
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true,
        }
    },
    {
        path: '/tasks/:id', 
        name: 'tasks',
        component: TestTasksVariable 
    },
    {
        path: '/notes/list', 
        name: 'notes-list',
        component: NotesList
    }

]

export default routes
