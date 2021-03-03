import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import router from '../router'
export default {
  namespaced: true,
  state: () => {
    return {
      uid: '',
      username: '',
      email: '',
      displayName: ''
    }
  },
  getters: {

    userRef(state) {
      const firebase_uid = firebase.auth().currentUser.uid
      if (firebase_uid === state.uid) {
        return firebase.firestore().collection('users').doc(state.uid)
      } else {
        return false
      }
    },
    userId(state) {
      return state.uid
    }
  },
  mutations: {

    SET_USER(state, { uid, email, displayName }) {
      state.uid = uid
      state.email = email
      state.displayName = displayName
    },

  },
  actions: {

    ValidationUser({ getters, dispatch }, action) {
      if (getters.userRef) {
        action()
      } else {
        dispatch('showAlert', {
          message: 'Terjadi kesalahan, silahkan login kembali', 
          mode: 'danger'
        }, { root: true })
        dispatch('user/Logout', null, { root: true })
      }
    },

    Login({ dispatch, commit }, { email, password }) {
      commit('SET_LOADING', true, { root: true })

      // login with email and password
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
          commit('SET_USER', data.user)
          router.push({ name: 'main', params: data.user.uid })
          commit('SET_LOADING', false, { root: true })
          dispatch('showAlert', {
            message: "You're login to Saxtile"
          }, { root: true })
        })
        .catch(err => {
          commit('SET_LOADING', false, { root: true })
          dispatch('showAlert', {
            message: err.message, 
            mode: 'danger'
          }, { root: true })
        })
    },

    Register({ dispatch, commit }, { name, email, password }) {
      commit('SET_LOADING', true, { root: true })

      // register with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser

          // set dispayName with registration name
          user.updateProfile({
            displayName: name
          }).then(() => commit('SET_USER', user))

          // create username
          let username = email.split('@')[0]

          // store user data to database
          firebase.firestore().collection('users').doc(user.uid).set({
            email,
            username,
            displayName: name,
            createdAt: new Date().getTime()
          })
          dispatch('showAlert', {
            message: "Register success, Welcome to Saxtile"
          }, { root: true })
          commit('SET_LOADING', false, { root: true })
        })
        .catch(err => {
          dispatch('showAlert', {
            message: "Error: " + err.message, 
            mode: 'danger'
          }, { root: true })
          commit('SET_LOADING', false, { root: true })
        })

    },

    Logout({ commit, dispatch }) {

      // logout user
      firebase.auth().signOut()

      commit('SET_USER', { uid: '', email: '', displayName: null })
      dispatch('showAlert', { message: "You're logout, goodbye" }, { root: true })
      router.push({ name: 'auth' })
    }

  }
}
