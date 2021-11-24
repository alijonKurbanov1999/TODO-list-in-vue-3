import Vuex from 'vuex'
import axios from "axios";

const store = new Vuex.Store({
    state: {
        flag: false,
        peopleList: [],
        personInfo: null,
        search: '',
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
            state.peopleList.splice(payload, 1)
            console.log('REMOVED: ', state.peopleList.findIndex(p => p.id === payload))
        },
        DETAILS_USER(state, payload) {
            // console.log('PERSON INFO: ', payload)
            state.personInfo = payload
        }
    },
    actions: {
        openModal({commit}, payload) {
            // console.log('flag is: ', payload)
            commit('OPEN_MODAL', payload)
        },
        cancelModal({commit}, payload) {
            // console.log('FLAG IS: ', payload)
            commit('CANCEL_MODAL', payload)
        },
        initData({commit}) {
          axios.get('http://localhost:3000/people')
              .then(res => {
                  console.log('INIT DATA IS: ', res.data)
                  commit('INIT_DATA', res.data)
              }).catch(err => console.error('ERROR: ', err))
        },
        createUser({commit}, userData) {
            // console.log('USERDATA ARE: ', userData)
            axios.post('http://localhost:3000/people', userData)
                .then(response => {
                    console.log('response result: ', {...response.data})
                    commit('CREATE_USER', response.data)
                }).catch(err => {console.error('ERROR: ', err)})

        },
        removeUser({commit}, payload) {
            commit('REMOVE_USER', payload)
        },
        detailsUser({commit}, payload) {
            axios.get(`http://localhost:3000/people/${payload}`)
                .then(response => {
                    commit('DETAILS_USER', response.data)
                }).catch(err => {console.error('ERROR: ', err)})
        }
    },
    getters: {
        flag(state) {
            return state.flag
        },
        peopleList(state) {
            return state.peopleList.filter(p => state.search ? p.first_name.toLowerCase().includes(state.search.toLowerCase()) : true)
        },
        search(state) {
            return state.search
        },
        personInfo(state) {
            return state.personInfo
        }
    }
})

export default store
