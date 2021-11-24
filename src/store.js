import Vuex from 'vuex'
import axios from "axios";

const store = new Vuex.Store({
    state: {
        flag: false,
        peopleList: [],
        personInfo: null,
    },
    mutations: {
        OPEN_MODAL(state, payload) {
            state.flag = payload
        },
        CANCEL_MODAL(state, payload) {
            state.flag = payload
        },
        INIT_DATA(state, payload) {
          state.peopleList = payload
        },
        CREATE_USER(state, payload) {
          state.peopleList.push(payload)
        },
        REMOVE_USER(state, payload) {
            state.peopleList.filter(p => p.id !== payload)
        },
        DETAILS_USER(state, payload) {
            state.personInfo = payload
        }
    },
    actions: {
        openModal({commit}, payload) {
            commit('OPEN_MODAL', payload)
        },
        cancelModal({commit}, payload) {
            commit('CANCEL_MODAL', payload)
        },
        initData(context) {
          axios.get(process.env.VUE_APP_API_DATA)
              .then(res => {
                  console.log('INIT DATA IS: ', res.data)
                  context.commit('INIT_DATA', res.data)
              }).catch(err => console.error('ERROR: ', err))
        },
        createUser(context, userData) {
            axios.post(process.env.VUE_APP_API_DATA , userData)
                .then(response => {
                    console.log('response result: ', {...response.data})
                    context.commit('CREATE_USER', response.data)
                }).catch(err => {console.error('ERROR: ', err)})

        },
        removeUser({commit}, payload) {
            axios.delete(`${process.env.VUE_APP_API_DATA}/${payload}`)
                .then(response => {
                    console.log('REMOVED :', response.data.id)
                    commit('REMOVE_USER', response.data.id)
                }).catch(err => {console.error('ERROR: ', err)})
        },
        detailsUser(context, payload) {
            axios.get(`${process.env.VUE_APP_API_DATA}/${payload}`)
                .then(response => {
                    context.commit('DETAILS_USER', response.data)
                }).catch(err => {console.error('ERROR: ', err)})
        }
    },
    getters: {
        flag(state) {
            return state.flag
        },
        peopleList(state) {
            return state.peopleList
        },
        personInfo(state) {
            return state.personInfo
        }
    }
})

export default store
