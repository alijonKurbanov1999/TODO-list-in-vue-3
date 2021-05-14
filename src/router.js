import { createRouter, createWebHistory } from 'vue-router'
import RequestTable from '@/component/RequestTable'
import view from '@/component/view'
import Main from '@/component/Main'

export const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/main', component: Main, alias:'/' },
        { path: '/table', component: RequestTable },
        { path: '/table/:id?', component: view }
    ]
})