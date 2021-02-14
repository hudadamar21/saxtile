/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
export default  {
	methods: {
		commitText(action, data){
			this.$store.commit(`text/${action}`, data, {root: true})
		},
		dispatchText(action, data){
			this.$store.dispatch(`text/${action}`, data, {root: true})
		}
	}
}