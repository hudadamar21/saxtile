import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => ({
    lists: [],
    loading: false,
    show_form_modal: false,
    open_collection: false,
    collection_data: {}
  }),
  mutations: {
    SET_LOADING(state, value){
      state.loading = value
    },
    SET_SHOW_FORM_MODAL(state, value){
      state.show_form_modal = value
    },
    SET_OPEN_COLLECTION(state, value){
      state.open_collection = value
    },
    SET_COLLECTION_DATA(state, value){
      state.collection_data = value
    }
  },
  actions: {
    List({state, rootGetters, dispatch, commit}){
      dispatch('user/ValidationUser', () => {
        commit('SET_LOADING', true)
        rootGetters['user/userRef'].collection('text_collection').orderBy("date", "desc")
          .onSnapshot(snaps => {
            state.lists = []
            snaps.forEach(snap => {
              let data = snap.data()
              data['id'] = snap.id
              state.lists.push(data)
            })
            commit('SET_LOADING', false)
          })
      }, {root:true})
    },
    Save({rootGetters, dispatch}, newData){
      console.log(newData);
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef'].collection('text_collection').add(newData)
          .then(() => console.log('Text Collection Berhasil di simpan'))
          .catch(err => console.log("Save Error Message: " + err))
      }, {root:true})
    },
    Update({rootGetters, dispatch}, {id, data}){
      dispatch('user/ValidationUser', () => {
        rootGetters['user/userRef'].collection('text_collection').doc(id).update(data)
          .then(() => console.log('Data berhasil diupdate!'))
          .catch(err => console.log('Data gagal diupdate! - ', err))
      }, {root:true})
    },
  }
}