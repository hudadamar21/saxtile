<template>
  <form @submit.prevent="submit" class="px-3 flex flex-col justify-center items-center w-full">
    <input
      v-if="isRegister"
      class="input"
      :class="focusMode"
      ref="name"
      type="text"
      placeholder="name.."
      v-model="form.name"
    />

    <input
      class="input"
      :class="focusMode"
      ref="email"
      type="email"
      placeholder="email.."
      v-model="form.email"
    />

    <input
      class="input"
      :class="focusMode"
      ref="password"
      type="password"
      placeholder="password.."
      v-model="form.password"
    />

    <Button
      class="flex items-center justify-center"
      :color="isRegister ? 'green' : 'blue'"
      shadow="shadow-lg"
      @click="submit"
    >
      <SVGIcon v-if="$store.state.loading" icon="loading-animate" size="w-5 h-5" />
      <svg
        v-else-if="!isRegister"
        class="w-5 h-5 inline"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        ></path>
      </svg>
      <svg
        v-else
        class="w-5 h-5 inline"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        ></path>
      </svg>
      <p class="ml-1">{{ isRegister ? 'Register' : 'Login' }}</p>
    </Button>
  </form>
</template>

<script>
export default {
  props: {
    isRegister: Boolean,
  },
  components: {
    Button: () => import('@/components/Button'),
    SVGIcon: () => import('@/components/SVGIcon'),
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  watch: {
    'form.name'(newval) {
      this.validateWatch('name', newval)
    },
    'form.email'(newval) {
      this.validateWatch('email', newval)
    },
    'form.password'(newval) {
      this.validateWatch('password', newval)
    },
    isRegister(newval) {
      this.register = newval
    },
  },
  computed: {
    focusMode() {
      return this.isRegister ? 'input-register' : 'input-login'
    },
    formValid() {
      return this.isRegister &&
        this.form.name == '' &&
        this.form.email == '' &&
        this.form.password == ''
        ? true
        : this.form.email && this.form.password
        ? true
        : false
    },
  },
  methods: {
    validateWatch(val, newval) {
      let value = this.$refs[val]
      if (newval == '') value.classList.add('invalid')
      else value.classList.remove('invalid')
    },
    validateSubmit(val) {
      let value = this.$refs[val]
      if (this.form[val] == '') value.classList.add('invalid')
      else value.classList.remove('invalid')
    },
    submit() {
      if (this.isRegister) {
        this.validateSubmit('name')
      }
      this.validateSubmit('email')
      this.validateSubmit('password')

      if (this.formValid) this.$emit('submited', this.form)
    },
  },
}
</script>

<style lang="postcss" scoped>
.input {
  @apply px-5 py-2 border mb-3 mx-5 w-full;
}
.input-login:focus {
  @apply outline-none border-blue-500;
}
.input-register:focus {
  @apply outline-none border-green-500;
}
.invalid,
.invalid:focus {
  @apply border-red-600;
}
</style>