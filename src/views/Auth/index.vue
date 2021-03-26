<template>
  <div
    class="h-screen w-full flex justify-center items-center"
    :class="isRegister ? 'bg-register' : 'bg-login'"
  >
  <router-link to="/" class="fixed top-5 left-5 text-white hover:bg-white hover:bg-opacity-10 rounded-full" >
    <SVGIcon icon="back" size="w-12 h-12" />
  </router-link>
    <div
      class="bg w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded z-10 overflow-hidden bg-center bg-cover"
      :class="colorMode('bg', '600')"
      :style="`background-image: url(${isRegister ? bg2 : bg1});`"
    >
      <div
        class="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 md:back-drop"
        :class="colorMode('bg', '500')"
      >
        <h1 class="text-3xl md:text-4xl font-extrabold text-white my-2 md:my-0">SAXTILE</h1>
        <p class="mb-2 text-white hidden md:block font-mono">save your link/text and files</p>
      </div>
      <div class="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4">
        <h3 class="mb-4 font-bold text-2xl flex items-center" :class="colorMode('text', '500')">
          <SVGIcon icon="user" size="w-8 h-8" class="inline mr-1" />
          {{ isRegister ? 'REGISTER' : 'LOGIN' }}
        </h3>
        <FormInput @submited="submit" :isRegister="isRegister" />
        <p v-if="!isRegister" class="text-gray-700 text-sm">
          tidak punya akun?
          <button
            class="text-green-500 hover:text-green-600 mt-3 focus:outline-none font-bold underline"
            @click="isRegister = true"
          >
            register
          </button>
        </p>
        <p v-else class="text-gray-700 text-sm">
          sudah punya akun ?
          <button
            class="text-blue-500 hover:text-blue-600 mt-3 focus:outline-none font-bold underline"
            @click="isRegister = false"
          >
            login
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import bg1 from '@/assets/images/bg1.webp'
import bg2 from '@/assets/images/bg2.webp'
export default {
  title: 'Saxtile',
  components: {
    FormInput: () => import(/* webpackChunkName: "auth" */ './FormInput'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  data() {
    return {
      isRegister: false,
      bg1,
      bg2,
    }
  },
  methods: {
    colorMode(property, size) {
      return this.isRegister ? `${property}-green-${size}` : `${property}-blue-${size}`
    },
    dispatchUser(ref, data) {
      this.$store.dispatch(ref, data, { root: true })
    },
    submit(form) {
      this.isRegister
        ? this.dispatchUser('user/Register', form)
        : this.dispatchUser('user/Login', form)
    },
  },
}
</script>

<style scoped lang="postcss">
.bg-login {
  @apply bg-gradient-to-tr from-blue-900 to-blue-600;
}
.bg-register {
  @apply bg-gradient-to-tr from-green-900 to-green-600;
}
.back-drop {
  backdrop-filter: blur(2px);
}
.auth-title {
  margin-top: 100px;
  font-size: 190px;
  transform: rotateZ(-15deg);
  z-index: 0;
  color: rgba(34, 83, 190, 0.295);
}
</style>
