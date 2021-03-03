import 'firebase/firestore';

export default {
  
  namespaced: true,

  state: () => ({
    lists: [],
    loading: false,
    show_form_modal: false,
    open_collection: false,
    collection_data: null,
    is_update: false
  }),
  
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_SHOW_FORM_MODAL(state, value) {
      state.show_form_modal = value
    },
    SET_OPEN_COLLECTION(state, value) {
      state.open_collection = value
    },
    SET_COLLECTION_DATA(state, value) {
      state.collection_data = value
    },
    SET_IS_UPDATE(state, value) {
      state.is_update = value
    }
  },

  actions: {
    List({ state, rootGetters, rootState, dispatch, commit }) {
      dispatch('user/ValidationUser', () => {
        commit('SET_LOADING', true)
        const { property, type } = rootState.setting.orderBy
        rootGetters['user/userRef']
          .collection('text_collection')
          .orderBy(property, type)
          .onSnapshot(snaps => {
            state.lists = []
            snaps.forEach(snap => {
              let data = snap.data()
              data['id'] = snap.id
              state.lists.push(data)
            })
            commit('SET_LOADING', false)
          })
      }, { root: true })
    },

    Save({ rootGetters, dispatch }, newData) {
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection('text_collection')
          .add(newData)
          .then(() => {
            dispatch('showAlert', { 
              message: 'Data berhasil disimpan' 
            }, { root: true })
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, mode: 'danger'
            }, { root: true })
          })
      }, { root: true })
    },

    Update({ rootGetters, dispatch }, { id, data }) {
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection('text_collection')
          .doc(id)
          .update(data)
          .then(() => {
            dispatch('showAlert', {
              message: 'Data berhasil diupdate'
            }, { root: true })
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, mode: 'danger'
            }, { root: true })
          })
      }, { root: true })
    },

    Delete({ rootGetters, dispatch, commit }, id) {
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection('text_collection')
          .doc(id)
          .delete()
          .then(() => {
            dispatch('showAlert', {
              message: 'Data berhasil dihapus'
            }, { root: true })
            commit('SET_OPEN_COLLECTION', false)
            commit('SET_COLLECTION_DATA', null)
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, mode: 'danger'
            }, { root: true })
          })
      }, { root: true })
    }

  }
}