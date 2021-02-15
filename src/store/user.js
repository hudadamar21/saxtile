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

    userRef(state){
      const firebase_uid = firebase.auth().currentUser.uid
      if(firebase_uid === state.uid){
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

    SET_USER(state, {uid, email, displayName}){
      state.uid = uid
      state.email = email
      state.displayName = displayName
    },

  },
  actions: {

    UserCommit({commit},{uid,email,displayName}){
      commit('SET_USER', {uid,email,displayName})
    },

    ValidationUser({getters, dispatch}, action){
      if(getters.userRef){
        action()
      } else {
        alert('Terjadi kesalahan, silahkan login kembali')
        dispatch('user/Logout', null, {root:true})
      }
    },

    Login({dispatch, commit}, {email, password}){
      commit('SET_LOADING', true, {root: true})
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((data) => {

          dispatch('UserCommit', data.user)
          router.push({ path: `/user/${data.user.uid}` })
          commit('SET_LOADING', false, {root: true})
        })
        .catch(err => {
          commit('SET_LOADING', false, {root: true})
          console.log('Login Gagal - ', err)
        })
      
    },

    Register({dispatch, commit}, {name, email, password}) {
      commit('SET_LOADING', true, {root: true})
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          const user = firebase.auth().currentUser
          user.updateProfile({
            displayName: name
          }).then(() => dispatch('UserCommit', user))
          let username = email.split('@')[0]
          firebase.firestore().collection('users').doc(user.uid).set({
            email,
            username,
            displayName: name,
            createdAt: new Date().getTime()
          })
          alert('Register Success')
          commit('SET_LOADING', false, {root: true})
        })
        .catch(err => {
          console.log('Register Gagal - ', err)
          commit('SET_LOADING', false, {root: true})
        })
      
    },

    Logout({commit}){
      firebase.auth().signOut()
      commit('SET_USER', {uid: '', email: '', displayName: null})
      router.push({name: 'auth'})
    }

  }
}
