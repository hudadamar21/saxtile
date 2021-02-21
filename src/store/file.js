import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

export default {
  namespaced: true,
  state: () => {
    return {
      all: [],

      // File Form
      filename: '',
      fileUpload: '',
      progressUpload: 0,
      loadingList: null,
      validationUpload: '',

      // FileList
      showOption: null
    }
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loadingList = value
    },
    SET_FILENAME(state, value) {
      state.filename = value
    },
    SET_FILE_UPLOAD(state, value) {
      state.fileUpload = value
    },
    SET_SHOW_OPTION(state, value) {
      state.showOption = value
    }
  },
  actions: {
    List({ state, rootGetters, rootState, dispatch, commit }) {

      // check user is valid
      dispatch('user/ValidationUser', () => {
        commit('SET_LOADING', true)
        const { property, type } = rootState.setting.orderBy

        // get user reference
        rootGetters['user/userRef']
          .collection('file')
          .orderBy(property, type)
          .onSnapshot(snaps => {
            state.all = []
            snaps.forEach(snap => {
              let data = snap.data()
              data['id'] = snap.id
              state.all.push(data)
            })
            commit('SET_LOADING', false)
          })
      }, { root: true })
    },
    Upload({ state, rootGetters, dispatch }, { filename, file }) {
      const uid = firebase.auth().currentUser.uid
      const storage = firebase.storage().ref(uid)
      const uploadTask = storage.child(filename).put(file)

      // get percentase progress
      uploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        state.progressUpload = parseInt(progress)
      }, (error) => {
        dispatch('showAlert', { message: error.message, mode: 'danger' }, { root: true })
      }, () => {

        // get link download file 
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          state.progressUpload = 0
          const newFile = {
            title: filename,
            content: downloadURL, // link file
            date: new Date().getTime()
          }

          // add new file to database
          rootGetters['user/userRef'].collection('file').add(newFile)
            .then(() => {
              dispatch('showAlert', { message: "File berhasil di Upload" }, { root: true })
            })
            .catch(err => {
              dispatch('showAlert', { message: err.message, mode: 'danger' }, { root: true })
            })

        });
      });
      return true
    },

    Delete({ dispatch, rootGetters }, { title, id }) {

      // check user is valid
      dispatch('user/ValidationUser', () => {

        // delete file on storage
        firebase.storage().ref(rootGetters['user/userId']).child(title).delete()
          .then(() => {

            // delete dokumen file on database
            rootGetters['user/userRef'].collection('file').doc(id).delete()
              .then(() => dispatch('showAlert', { message: "File berhasil dihapus" }, { root: true }))
              .catch(err => dispatch('showAlert', { message: err.message, mode: 'danger' }, { root: true }))

          })
          .catch(err => dispatch('showAlert', { message: err.message, mode: 'danger' }, { root: true }))
      }, { root: true })

    }

  }

}