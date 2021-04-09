import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => {
    return {
      lists: [],
      noteOpened: null,
      editmode: false,
      updatedNoteId: null,
      loading: false,
      noteColor: null,

      colorList: [
        'red',
        'yellow',
        'green',
        'blue',
        'gray',
        'no-color'
      ],
    }
  },
  mutations: {
    setLists(state, value){
      state.lists = value
    },
    setNoteOpened(state, value){
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
    setNoteColor(state, value){
      const noColor = {
        base: value,
        headerBg: {
          default: `bg-white`,
          editmode: `bg-gray-200`
        },
        noteBg: {
          default: `bg-white`
        },
        headerDarkBg: {
          default: `dark:bg-gray-600`,
          editmode: `dark:bg-gray-700`
        }
      }
      const colorMode = {
        base: value,
        headerBg: {
          default: `bg-${value}-300`,
          editmode: `bg-${value}-400`
        },
        noteBg: {
          default: `bg-${value}-100`
        },
        headerDarkBg: {
          default: `dark:bg-${value}-800`,
          editmode: `dark:bg-${value}-900`
        }
      }
      state.noteColor = value ==='no-color' ? noColor : colorMode
    }
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
      const updateDoc = {...updatedNote, date: new Date().getTime()}
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'note',
        updateDoc,
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