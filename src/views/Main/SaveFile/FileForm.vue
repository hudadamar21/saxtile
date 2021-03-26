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
        :placeholder="placeholder_name || 'filename..'"
      />

      <!-- Upload Button -->
      <button
        class="upload-button group"
        :disabled="disabledUploadButton || !file_upload"
        @click="uploadFile"
      >
      <div 
        v-if="disabledUploadButton && !file_upload" 
        class="absolute -bottom-3 opacity-0 group-hover:opacity-100 text-sm bg-red-500 text-white rounded py-1 px-2">
          <p>select file first</p>
      </div>
        <ProgressUpload :progress="progress_upload" />
        <div class="flex items-center focus:outline-none">
          <SVGIcon icon="upload" size="w-5 md:w-6 h-5 md:h-6" />
          <h1>Upload</h1>
        </div>
      </button>
    </div>

    <!-- Open Folder Button -->
    <label
      for="file"
      v-cloak
      ref="upload_file"
      @drop.prevent="changeFile($event, 'drop')"
      @dragover.prevent.stop="draggingFile('over')"
      @dragleave.prevent.stop="draggingFile('leave')"
      class="relative open-folder-button bg-white hover:bg-gray-200 h-16 md:h-full"
    >
      <div class="m-1">
        <img
          v-if="file_upload"
          @error="setDefaultImage"
          class="w-16 h-16 object-cover object-center"
          :class="is_default_image ? 'invert' : ''"
          :src="file_upload"
        />
        <div v-else class="flex flex-col justify-center items-center">
          <SVGIcon icon="folder" size="w-6 h-6" />
          <p class="text-xs hidden md:block">open / drop</p>
        </div>
      </div>
      <input type="file" ref="file" id="file" @change="changeFile" class="hidden" />
    </label>
  </div>
</template>

<script>
import default_file from '@/assets/images/default-file.webp'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Input: () => import(/* webpackChunkName: "components" */ '@/components/Input'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
    ProgressUpload: () => import(/* webpackChunkName: "components" */ '@/components/ProgressUpload'),
  },
  data() {
    return {
      is_default_image: false,
      disabledUploadButton: false,
      placeholder_name: ''
    }
  },
  computed: {
    ...mapState('file',[
        'progress_upload', 
        'filename', 
        'file_upload'
    ]),
    dragSupport() {
      let div = document.createElement('div')
      return (
        ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
      )
    },
  },
  methods: {
    ...mapMutations('file', {
      setFilename: 'SET_FILENAME',
      setFileUpload: 'SET_FILE_UPLOAD'
    }),
    ...mapActions([
      'showAlert'
    ]),
    draggingFile(event) {
      event == 'over'
        ? this.$refs.upload_file.classList.add('dragging-file')
        : event == 'leave'
        ? this.$refs.upload_file.classList.remove('dragging-file')
        : false
    },
    filenameChange(val) {
      if (this.filename.length > 30) return
      this.setFilename(val)
    },
    changeFile(e, mode) {
      this.is_default_image = false
      let file
      if (mode === 'drop') {
        if (this.dragSupport) {
          file = e.dataTransfer.files
          this.$refs.file.files = file
          file = file[0]
        } else {
          this.showAlert({ message: 'Browser anda tidak support drag & drop file', mode: 'danger'})
        }
      } else file = e.target.files[0]

      // validasi jika ukuran file lebih dari 3mb
      if (file.size > 3145728) {
        this.showAlert({ message: 'Ukuran file tidak boleh lebih besar dari 3mb', mode: 'danger'})
        this.$refs.upload_file.classList.remove('dragging-file')
        e.target.value = ''
        return
      }
      const reader = new FileReader()
      reader.addEventListener('load', () => this.setFileUpload(reader.result), false)
      if (file) reader.readAsDataURL(file)
      this.placeholder_name = `filename: ${file.name.split('.')[0]}`
      this.$refs.upload_file.classList.remove('dragging-file')
    },
    setDefaultImage() {
      this.setFileUpload(default_file)
      this.is_default_image = true
    },
    extenstionFile(file) {
      return file.split('.').pop()
    },
    uploadFile() {
      this.disabledUploadButton = true
      if (this.$refs.file.files[0]) {
        const file = this.$refs.file.files[0]

        let filename
        const ext = '.' + this.extenstionFile(file.name)
        if (this.filename) {
          filename = this.filename + ext
        } else {
          let name = file.name.split('.')[0]
          filename = file.name.length > 30 ? name.slice(0, 30) + ext : name + ext
        }
        this.$store.dispatch('file/Upload', { filename, file }).then(() => {
          this.setFilename('')
          this.setFileUpload('')
          this.disabledUploadButton = false
          this.placeholder_name = 'filename...'
        })
      } else {
        this.showAlert({ message: 'Pilih terlebih dahulu file yang akan diupload.', mode: 'warning' })
      }
    },
  },
}
</script>

<style lang="postcss">
.dragging-file {
  @apply bg-green-200 transform scale-105;
}
.upload-button {
  @apply mt-1 w-full flex justify-center items-center cursor-pointer rounded py-1 relative bg-white hover:bg-gray-200 disabled:bg-gray-200 text-sm md:text-base focus:outline-none disabled:cursor-not-allowed;
}
.open-folder-button {
  @apply ml-1 w-24 rounded cursor-pointer flex justify-center items-center;
}
.invert {
  filter: invert(1);
}
</style>