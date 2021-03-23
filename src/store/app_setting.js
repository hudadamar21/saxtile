export default {
  namespaced: true,
  state: () => ({
    orderBy: {
      property: 'date',
      type: 'desc'
    }
  }),
  mutations: {
    SET_SETTING(state, value) {
      state = value
    },
    SET_ORDER_BY(state, value) {
      state.orderBy = value
    },
  },
}