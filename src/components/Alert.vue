<template>
  <div
    class="flex items-center py-2 px-3 shadow-md mb-2 border-l-4"
    :class="`${bgColor} dark:bg-gray-600 ${animation}`"
  >
    <div class="rounded-full bg-white mr-3 dark:text-white" :class="textColor">
      <SVGIcon :icon="`alert-${mode}`" size="w-6 h-6" />
    </div>
    <div class="text-white max-w-xs">{{ message || 'without message' }}</div>
  </div>
</template>

<script>
export default {
  components: {
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      default: 'info',
      validator: (value) => ['success', 'info', 'warning', 'danger'].includes(value.toLowerCase()),
    },
    animation: {
      type: String,
      required: false,
      default: 'opacity',
      validator: (value) => ['rotate', 'flick', 'zoomin', 'opacity'].includes(value.toLowerCase()),
    },
  },
  computed: {
    bgColor() {
      return this.mode == 'success'
        ? 'bg-green-500 border-green-700'
        : this.mode == 'warning'
        ? 'bg-orange-500 border-orange-700'
        : this.mode == 'danger'
        ? 'bg-red-500 border-red-700'
        : 'bg-blue-500 border-blue-700'
    },
    textColor() {
      return this.mode == 'success'
        ? 'text-green-500'
        : this.mode == 'warning'
        ? 'text-orange-500'
        : this.mode == 'danger'
        ? 'text-red-500'
        : 'text-blue-500'
    },
  },
  mounted() {
    setTimeout(() => {
      this.$destroy()
    }, 3000)
  },
}
</script>

<style>
.rotate {
  animation: 0.5s rotate forwards;
}
.flick {
  animation: 0.5s flick forwards;
}
.zoomin {
  animation: 0.5s zoomin forwards;
}
.opacity {
  animation: 0.5s opacity forwards;
}

@keyframes rotate {
  from {
    transform-origin: top right;
    transform: translateX(5px) translateY(15px) rotate(-60deg);
  }
  to {
    transform: translateX(0) translateY(0) rotate(0);
  }
}

@keyframes flick {
  from {
    transform-origin: right;
    transform: translateX(15px) rotateZ(20deg) rotateY(90deg);
  }
  to {
    transform: translateX(0) rotateZ(0) rotateY(0);
  }
}

@keyframes zoomin {
  from {
    opacity: 0;
    transform: scale(1.5) translateX(-25px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>