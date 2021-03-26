<template>
  <div
    ref="modal"
    class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-0 z-50 py-0 md:py-5 flex justify-center items-center transition duration-300"
  >
    <div
      class="relative w-full sm:w-10/12 md:w-8/12 h-full bg-gray-100 dark:bg-gray-700 my-0 sm:my-20 rounded-none sm:rounded overflow-hidden transition duration-300 shadow-lg"
    >
      <div class="flex justify-between p-2 justify-center bg-white dark:bg-gray-600 border-b dark:border-gray-500">
        <h3 class="ml-2 font-semibold text-base md:text-xl uppercase text-gray-600 dark:text-white">{{ title }}</h3>
        <Button
          color="red"
          class="text-sm md:text-base"
          padding="px-2"
          sm
          @click.native="closeModal"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </Button>
      </div>
      <div class="flex flex-col p-3">
        <slot name="body" />
      </div>
      <div class=" h-12 border-t dark:border-gray-500 w-full">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.modal.classList.remove('bg-opacity-0')
      this.$refs.modal.classList.add('bg-opacity-50')
    }, 200)
  },
  methods: {
    closeModal() {
      this.$refs.modal.classList.remove('bg-opacity-50')
      this.$refs.modal.classList.add('bg-opacity-0')
      setTimeout(() => {
        this.$emit('closemodal')
      }, 50)
    },
  },
}
</script>

<style>
.z-infinite {
  z-index: 999999;
}
.-bottom-5 {
  bottom: -2.25rem;
}
.absolute-vertical-center {
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
}
</style>