export default {
  namespaced: true,
  state: () => {
    return {
      lists: [],

      // File Form
      filename: '',
      file_upload: '',
      progress_upload: 0,
      loading_list: null,

      // FileList
      show_option: null
    }
  },
  mutations: {
    SET_LISTS(state, lists){
      state.lists = lists.map(list => Object.freeze(list))
    },
    SET_LOADING(state, value) {
      state.loading_list = value
    },
    SET_FILENAME(state, value) {
      state.filename = value
    },
    SET_FILE_UPLOAD(state, value) {
      state.file_upload = value
    },
    SET_SHOW_OPTION(state, value) {
      state.show_option = value
    },
    SET_PROGRESS_UPLOAD(state, value){
      state.progress_upload = value
    }
  },
  actions: {
    List({ commit, dispatch }) {
      commit('SET_LOADING', true)
      dispatch('firebase_actions/GetDocument', {
        collection_name: 'file', 
        callback: lists => {
          commit('SET_LISTS', lists)
          commit('SET_LOADING', false)
        },
      }, {root: true})
    },
    
    Upload({ dispatch }, { filename, file }) {
      dispatch('firebase_actions/UploadFile', {
        collection_name: 'file', 
        filename, 
        file 
      }, {root: true})
    },

    Delete({ dispatch }, { title, id }) {
      dispatch('firebase_actions/DeleteFile', {
        collection_name: 'file', 
        title, 
        id, 
        messageOnComplete: 'File Berhasil di Hapus'
      }, {root: true})
    },

    async Archive({ dispatch, rootGetters}, {id, status}){
      dispatch('firebase_actions/UpdateDocument', {
        collection_name: 'file',
        id,
        updateText: {archived: status},
        messageOnComplete:  rootGetters.messageOnArchives('File')
      }, { root: true })
    }

  }
}