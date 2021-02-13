<template>
	<div class="w-full px-5 flex justify-center items-center mb-2">

    <div class="w-full lg:w-1/2 flex flex-col">
    <!-- Input Filename -->
      <Input
        autocomplete="off"
        id="filename"
        name="Filename.."
        sizeClass="w-full"
        :value="filename" 
        @getval="filenameChange"
        maxlength="30"
      />

      <!-- Upload Button -->
      <div class="upload-button bg-white hover:bg-gray-200 text-sm md:text-base"
          @click="uploadFile">
        <ProgressUpload :progress="progressUpload"/>
        <button class="flex items-center focus:outline-none" >
          <SVGIcon icon="upload" size="w-5 md:w-6 h-5 md:h-6" />
          <h1>Upload</h1>
        </button>
      </div>
    </div>
    
    <!-- Open Folder Button -->
    <label for="file" class="relative open-folder-button bg-white hover:bg-gray-200 h-16 md:h-full" v-cloak 
           ref="uploadFile"
           @drop.prevent="changeFile($event, 'drop')"
           @dragover.prevent.stop="draggingFile('over')"
           @dragleave.prevent.stop="draggingFile('leave')"
    > 
      <div class="m-1">
        <img v-if="fileUpload" @error="setDefaultImage" 
             class="w-16 h-16 object-cover object-center"
             :class="isDefaultImage ? 'invert' : ''"
             :src="fileUpload">
        <div v-else class="flex flex-col justify-center items-center">
          <SVGIcon icon="folder" size="w-6 h-6" />
          <p class="text-xs hidden md:block">open / drop</p>
        </div>

      </div>
      <input type="file" ref="file" id="file"  @change="changeFile" class="hidden">
    </label>

  </div>
</template>

<script>

import defaultFile from '@/assets/images/default-file.png';
import { mapState } from 'vuex';

import {
  Input,
  SVGIcon,
  ProgressUpload
} from "@/components"

export default {
  props: {
    setReferenceImage: {
      type: Function,
      required: true
    }
  },
  components: {
    Input,
    SVGIcon,
    ProgressUpload
  },
  data(){
    return {
      isDefaultImage: false
    }
  },
  computed: {
    ...mapState({
      progressUpload: state => state.file.progressUpload,
      filename: state => state.file.filename,
      fileUpload: state => state.file.fileUpload,
    }),
    dragSupport(){
      let div = document.createElement('div');
       return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
    }
  },
  methods: {
    draggingFile(event){
      event == 'over' 
        ? this.$refs.uploadFile.classList.add('dragging-file')
        : event == 'leave'
          ? this.$refs.uploadFile.classList.remove('dragging-file') : false
    },
    
    filenameChange(val){
      if(this.filename.length > 30) return
      this.$store.commit('file/SET_FILENAME', val, {root: true})
    },
    changeFile(e, mode){
      this.isDefaultImage = false

      let file
      const {commit} = this.$store
      if(mode === 'drop'){
        if(this.dragSupport){
          file = e.dataTransfer.files
          this.$refs.file.files = file
          file = file[0]
        } else {
          commit(
            'file/SET_VALIDATION_UPLOAD', 
            'Browser anda tidak support drag & drop file', 
            {root: true}
          )
        }
      } else file = e.target.files[0]
      if(file.size > 3145728) {
        commit(
            'file/SET_VALIDATION_UPLOAD', 
            'Ukuran file tidak boleh lebih besar dari 3mb', 
            {root: true}
          )
        e.target.value = ''
        return 
      }
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        commit('file/SET_FILE_UPLOAD', reader.result, {root: true})
      }, false)
      if (file) {
        reader.readAsDataURL(file);
      }
      this.$refs.uploadFile.classList.remove('dragging-file')
    },
    setDefaultImage(){
      this.fileUpload = defaultFile
      this.isDefaultImage = true
    },
    extenstionFile(file){
      return file.split('.').pop()
    },
    uploadFile(){
      console.log(this.$refs.file)
      if(this.$refs.file.files[0]){
        const file = this.$refs.file.files[0]
      
        let filename;
        const ext = '.'+this.extenstionFile(file.name)
        if(this.filename){
          filename = this.filename + ext
        } else {
          let name = file.name.split('.')[0]
          filename = file.name.length > 30 ? name.slice(0, 30) + ext : name + ext
        }

        this.$store.dispatch('file/Upload', {filename, file}, {root:true})
          .then(() => {
            const {commit} = this.$store
            commit('file/SET_FILENAME', '', {root: true})
            commit('file/SET_FILE_UPLOAD', '', {root: true})
          })

      } else {
        alert('Pilih terlebih dahulu file yang akan diupload.')
      }
    },
  }
}
</script>

<style lang="postcss">
  .dragging-file{
    @apply bg-green-200 transform scale-105
  }
  .upload-button {
    @apply mt-1 w-full flex justify-center items-center cursor-pointer rounded py-1 relative
  }
  .open-folder-button {
    @apply ml-1 w-24 rounded cursor-pointer flex justify-center items-center 
  }
  .invert{
    filter: invert(1);
  }
</style>