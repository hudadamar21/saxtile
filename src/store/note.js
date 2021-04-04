import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => {
    return {
      lists: [],
      noteOpened: null,
      editmode: false,
      updatedNoteId: false,
      loading: false
    }
  },
  mutations: {
    setLists(state, value){
      state.lists = value
    },
    setNoteOpened(state, value){
      console.log('store');
      state.noteOpened = value
    },
    setEditMode(state, value){
      state.editmode = value
    },
    setUpdatedNoteId(state, value){
      state.updatedNoteId = value
    },
    setLoading(state, value){
      state.loading = value
    },
  },
  actions: {
    List({ commit, dispatch }) {
      dispatch('firebase_actions/GetDocument', {
        collection_name: 'note', 
        callback(lists) {
          commit('setLists', lists)
          console.log(lists);
        }
      }, {root: true})
    },

    Save({ dispatch }, newNote) {
      dispatch('firebase_actions/SaveDocument', {
        collection_name: 'note',
        data: newNote
      }, {root: true})
    },

    Update({ state, dispatch }, updatedNote) {
      console.log(updatedNote);
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'note',
        updateDoc: {...updatedNote},
        id: state.updatedNoteId
      }, { root: true })
    },

    Delete({ dispatch, commit }, id) {
      dispatch('firebase_actions/DeleteDocument', {
        collection_name: 'note',
        id,
        messageOnComplete: 'Note Berhasil di Hapus'
      }, { root: true })
      commit('setNoteOpened', null)
      commit('setEditMode', false)
      commit('setUpdatedNoteId', null)
    },

    async Archive({dispatch, rootGetters}, {id, status}){
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'note',
        id,
        updateDoc: {archived: status},
        messageOnComplete: rootGetters.messageOnArchives('Note')
      }, { root: true })
    }

  }
}