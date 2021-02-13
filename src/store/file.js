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
    SET_LOADING(state, value){
      state.loadingList = value
    },
    SET_FILENAME(state, value){
      state.filename = value
    },
    SET_FILE_UPLOAD(state, value){
      state.fileUpload = value
    },
    SET_SHOW_OPTION(state, value){
      state.showOption = value
    }
  },
  actions: {
    List({state, rootGetters, dispatch, commit}){
      dispatch('user/ValidationUser', () => {
        commit('SET_LOADING', true)
        rootGetters['user/userRef'].collection('file')
          .onSnapshot(snaps => {
            state.all = []
            snaps.forEach(snap => {
              let data = snap.data()
              data['id'] = snap.id
              state.all.push(data)
            })
            commit('SET_LOADING', false)
          })
      }, {root: true})
    },
    Upload({state, rootGetters}, {filename, file}){
      const uid = firebase.auth().currentUser.uid
      const storage = firebase.storage().ref(uid)
      const uploadTask = storage.child(filename).put(file)

      uploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        state.progressUpload = parseInt(progress)
      }, (error) => console.log("Uploading Error", error), () => { 
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          state.progressUpload = 0
          const newFile = {
            title: filename,
            content: downloadURL,
            date: new Date().getTime()
          }
          rootGetters['user/userRef'].collection('file').add(newFile)
            .then(() => console.log("File Berhasil di Upload"))
            .catch(err => console.log("Upload Error Message: " + err))

        });
      });
      return true
    },

    Delete({dispatch, rootGetters}, {title, id}){
      dispatch('user/ValidationUser', () => {
        firebase.storage().ref(rootGetters['user/userId']).child(title).delete()
          .then(() => {
            console.log('File removed on Storage')
            rootGetters['user/userRef'].collection('file').doc(id).delete()
              .then(() => console.log('File Removed on database'))
              .catch(() => console.log('Error during removed file on database'))
          })
          .catch(() => console.log('Error during removed file on Storage'))
      }, {root:true})
      
    }

  }

}