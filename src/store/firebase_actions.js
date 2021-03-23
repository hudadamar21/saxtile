import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

export default {
  namespaced: true,
  actions: {

    GetDocument({ rootGetters, rootState, dispatch }, {collection_name, callback}){
      // check user is valid
      dispatch('user/ValidationUser', () => {
        const { property, type } = rootState.app_setting.orderBy
        // get user reference
        rootGetters['user/userRef']
          .collection(collection_name)
          .orderBy(property, type)
          .onSnapshot(snaps => {
            let lists = []
            snaps.forEach(snap => lists.push({
              ...snap.data(), 
              id: snap.id
            }))
            callback(lists)
          })
      }, { root: true })
    },

    SaveDocument({ rootGetters, dispatch }, {collection_name, data, messageOnComplete}){
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection(collection_name)
          .add(data)
          .then(() => {
            dispatch('showAlert', {
              message: messageOnComplete
            }, { root: true })
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, 
              mode: 'danger'
            }, { root: true })
          })

      }, { root: true })
    },

    UpdateDocument({ rootGetters, dispatch }, {collection_name, id, updateText, messageOnComplete}){
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection(collection_name)
          .doc(id)
          .update(updateText)
          .then(() => {
            dispatch('showAlert', {
              message: messageOnComplete
            }, { root: true })
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, 
              mode: 'danger'
            }, { root: true })
          })
      }, { root: true })
    },

    DeleteDocument({ rootGetters, dispatch, }, {collection_name, id, messageOnComplete}){
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef']
          .collection(collection_name)
          .doc(id)
          .delete()
          .then(() => dispatch('showAlert', {
            message: messageOnComplete
          }, { root: true }))
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, 
              mode: 'danger'
            }, { root: true })
          })

      }, { root: true })
    },

    UploadFile({ commit, dispatch }, {collection_name,  filename, file }){
      const uid = firebase.auth().currentUser.uid
      const storage = firebase.storage().ref(uid)
      const uploadTask = storage.child(filename).put(file)

      // get percentase progress
      uploadTask.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        commit(`${collection_name}/SET_PROGRESS_UPLOAD`, parseInt(progress), {root:true})
      }, (error) => {
      // show alert when error
        dispatch('showAlert', {
          message: error.message, 
          mode: 'danger'
        }, { root: true })
      }, () => {
        // get link download file 
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          commit(`${collection_name}/SET_PROGRESS_UPLOAD`, 0, {root:true})
          const newFile = {
            title: filename,
            content: downloadURL, // link file
            archived: false,
            date: new Date().getTime()
          }
          // save data file to database
            dispatch('SaveDocument', {
              collection_name: collection_name,
              data: newFile,
              messageOnComplete: 'File Berhasil di Simpan'
            })
        });
      });
    },

    DeleteFile({ dispatch, rootGetters }, {collection_name, title, id , messageOnComplete}){
      // check user is valid
      dispatch('user/ValidationUser', () => {
        // delete file on storage
        firebase.storage().ref(rootGetters['user/userId']).child(title).delete()
          .then(() => {
            // delete dokumen file on database
            dispatch('DeleteDocument', {
              collection_name: collection_name,
              id,
              messageOnComplete: messageOnComplete
            })
          })
          .catch(err => {
            dispatch('showAlert', {
              message: err.message, 
              mode: 'danger'
            }, { root: true })
          })
      }, { root: true })
    }

  }
}