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
    SET_LISTS(state, value) {
      state.lists = value
    },
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
    List({ commit, dispatch }) {
      commit('SET_LOADING', true)
      dispatch('firebase_actions/GetDocument', {
        collection_name: 'text_collection', 
        callback: lists => {
          commit('SET_LISTS', lists)
          commit('SET_LOADING', false)
        }
      }, {root: true})
    },

    Save({ dispatch }, newText) {
      dispatch('firebase_actions/SaveDocument', {
        collection_name: 'text_collection',
        data: newText,
        messageOnComplete: 'Text Berhasil di Simpan'
      }, {root: true})
    },

    Update({ dispatch }, { id, data }) {
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'text_collection',
        updateText: data,
        id,
        messageOnComplete: 'Text Berhasil di Update'
      }, { root: true })
    },

    Delete({ dispatch, commit }, id) {
      dispatch('firebase_actions/DeleteDocument', {
        collection_name: 'text_collection',
        id,
        messageOnComplete: 'Text Berhasil di Hapus'
      }, { root: true })
      commit('SET_OPEN_COLLECTION', false)
      commit('SET_COLLECTION_DATA', null)
    },

    Archive({ dispatch, rootGetters }, {id, status}){
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'text_collection',
        id,
        updateText: { archived: status },
        messageOnComplete:  rootGetters.messageOnArchives('Text')
      }, { root: true })
    }

  }
}