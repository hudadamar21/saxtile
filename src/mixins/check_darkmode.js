export default {
  computed: {
    checkDarkmode(){
      return document.querySelector('body').classList.contains('dark')
    }
  }
}