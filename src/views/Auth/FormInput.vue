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
      :type="isLookPassword ? 'text' : 'password'"
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
      <SVGIcon v-else-if="!isRegister" icon="login" size="w-5 h-5" />
      <SVGIcon v-else icon="register" size="w-5 h-5" />
      
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
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      isLookPassword: false
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
      newval == ''
        ? value.classList.add('invalid')
        : value.classList.remove('invalid')
    },
    validateSubmit(val) {
      let value = this.$refs[val]
      this.form[val] == ''
        ? value.classList.add('invalid')
        : value.classList.remove('invalid')
    },
    submit() {
      if (this.isRegister) this.validateSubmit('name')
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

.input  input:focus {
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