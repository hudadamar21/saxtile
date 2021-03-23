import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => {
    return {
      lists: [],
      input: {
        title: '',
        content: ''
      },
      loadingList: null,
      showOption: null,
      updateTextId: null,
      isUpdate: false,
      validation: null,
    }
  },
  mutations: {
    SET_LISTS(state, lists){
      state.lists = lists.map(list => Object.freeze(list))
    },
    SET_LOADING(state, value) {
      state.loadingList = value
    },
    SET_INPUT(state, value) {
      state.input = value
    },
    SET_IS_UPDATE(state, value) {
      state.isUpdate = value
    },
    SET_SHOW_OPTION(state, value) {
      state.showOption = value
    },
    SET_UPDATE_TEXT_ID(state, value) {
      state.updateTextId = value
    },
    SET_VALIDATION(state, value) {
      state.validation = value
    },
  },
  actions: {
    List({ commit, dispatch }) {
      commit('SET_LOADING', true)
      dispatch('firebase_actions/GetDocument', {
        collection_name: 'text', 
        callback: lists => {
          commit('SET_LISTS', lists)
          commit('SET_LOADING', false)
        }
      }, {root: true})
    },

    Save({ dispatch }, newText) {
      dispatch('firebase_actions/SaveDocument', {
        collection_name: 'text',
        data: newText,
        messageOnComplete: 'Text Berhasil di Simpan'
      }, {root: true})
    },

    Update({ dispatch, state }, updateText) {
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'text',
        updateText,
        id: state.updateTextId,
        messageOnComplete: 'Text Berhasil di Update'
      }, { root: true })
    },

    Delete({ dispatch, }, id) {
      dispatch('firebase_actions/DeleteDocument', {
        collection_name: 'text',
        id,
        messageOnComplete: 'Text Berhasil di Hapus'
      }, { root: true })
    },

    async Archive({dispatch, rootGetters}, {id, status}){
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'text',
        id,
        updateText: {archived: status},
        messageOnComplete: rootGetters.messageOnArchives('Text')
      }, { root: true })
    }

  }
}