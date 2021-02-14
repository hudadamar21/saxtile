import 'firebase/firestore';

export default {
  namespaced: true,
  state: () => ({
    collectionData: null,
    openModalForm: false,
    showCollection: false,
    actionCompleteId: null,
    IsUpdate: false
  }),
  mutations: {
    SET_COLLECTION_DATA(state, value){
      state.collectionData = value
    },
    SET_OPEN_MODAL_FORM(state, value){
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