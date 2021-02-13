import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => {
    return {
      collectionData: null,
      openForm: false,
      showCollection: false,
      actionCompleteId: null,
      IsUpdate: false
    }
  },
  mutations: {
    SET_COLLECTION_DATA(state, value){
      state.collectionData = value
    },
    SET_OPEN_FORM(state, value){
      state.openForm = value
    },
    SET_SHOW_COLLECTION(state, value){
      state.showCollection = value
    },
    SET_IS_UPDATE(state, value){
      state.IsUpdate = value
    }
  },
  actions: {
  }
}