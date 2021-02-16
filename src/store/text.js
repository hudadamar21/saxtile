import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => {
    return {
      all: [],
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
    SET_LOADING(state, value){
      state.loadingList = value
    },
    SET_INPUT(state, value){
      state.input =  value
    },
    SET_IS_UPDATE(state, value){
      state.isUpdate = value
    },
    SET_SHOW_OPTION(state, value){
      state.showOption = value
    },
    SET_UPDATE_TEXT_ID(state, value){
      state.updateTextId = value
    },
    SET_VALIDATION(state, value){
      state.validation = value
    },
  },
  actions: {
    List({state, rootGetters, rootState, dispatch, commit}){
      dispatch('user/ValidationUser', () => {

        commit('SET_LOADING', true)
        const {property, type} = rootState.setting.orderBy

        rootGetters['user/userRef']
          .collection('text')
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

      }, {root:true})
    },
    Save({rootGetters, dispatch}, newText){
      dispatch('user/ValidationUser', () => {

        rootGetters['user/userRef']
          .collection('text')
          .add(newText)
            .then(() => console.log('Text Berhasil di simpan'))
            .catch(err => console.log("Save Error Message: " + err))

      }, {root:true})
    },
    Update({rootGetters, dispatch, state}, updateText){
      dispatch('user/ValidationUser', () => {

        rootGetters['user/userRef']
          .collection('text')
          .doc(state.updateTextId)
          .update(updateText)
            .then(() => console.log('Data berhasil diupdate!'))
            .catch(err => console.log('Data gagal diupdate! - ', err))

      }, {root:true})
    },
    Delete({rootGetters, dispatch}, id){
      dispatch('user/ValidationUser', () => {

        rootGetters['user/userRef']
          .collection('text')
          .doc(id)
          .delete()
            .then(() => console.log("Data berhasil dihapus!"))
            .catch(err => console.log("Data gagal dihapus! - ",err))

      }, {root:true})
    }

  }
}