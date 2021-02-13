<template>
  <div class="flex items-center">
    <Button v-if="list.type === 'collection'"
      color="blue" 
      @click.stop.native="$emit('opencollection',list)"
      sm>
      open
    </Button>
    <Button v-else
      color="green" 
      @click.stop.native="copyText(list.content)"
      sm>
      <p>{{ textCopied ? 'copied' : 'copy'}}</p>
    </Button>
    <a v-if="isUrl(list.content)"
      @click.stop
      class="bg-blue-500 hover:bg-blue-600 rounded p-1 text-white ml-2"
      :href="list.content"
      target="_blank" title="go to link"
    >
      <SVGIcon icon="goto" size="w-5 h-5" />
      </a>
  </div>
</template>

<script>
import {
  Button,
  SVGIcon
} from '@/components';
export default {
  props: {
    list: {
      type: Object,
      required: true
    },
    isUrl: {
      type: Function,
      required: true
    }
  },
  components: {
    Button,
    SVGIcon
  },
  data(){
    return {
      textCopied: false
    }
  },
  methods: {
    copyText(content) {
      this.$copyText(content).then(() => {
        this.textCopied = true
        setTimeout(() => {
        this.textCopied = false
        }, 1000);
      }).catch(() => alert('not copied'))
    }
  }
}
</script>

<style>

</style>