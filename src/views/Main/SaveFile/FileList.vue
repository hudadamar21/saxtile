<template>
  <ul class="file-list md:overflow-auto">
    <!-- jika list kosong -->
    <li v-if="!lists.length" class="text-center font-semibold mt-5"
        :class="onArchives ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200'"
    >
      Tidak ada {{ onArchives ? 'archive' : '' }} file yang tersimpan.
    </li>

    <!-- list views -->
    <List
      v-else
      v-for="list of lists"
      mode="dark"
      :key="list.id"
      :data="list"
      :showOption="show_option"
      @toggle="(id) => toggle(id)"
      @archive="(id) => archiveFile(id, list.title)"
    >
      <!-- Content (title and date) -->
      <template #content>
        <div class="flex flex-row items-center w-full text-white">
          <img :src="list.content" @error="setReferenceImage" class="w-24 h-24 object-cover mr-3" />
          <div>
            <h3 class="font-bold break-all">{{ list.title }}</h3>
            <p class="text-gray-400 text-xs">{{ new Date().formatDate(list.date) }}</p>
          </div>
        </div>
      </template>

      <!-- Action (download) -->
      <template #action>
        <a
          :href="list.content"
          :download="list.title"
          @click.stop
          class="bg-white hover:bg-gray-200 text-gray-700 rounded px-2 py-1 mt-2 lg:mt-0 flex items-center text-sm"
          target="_blank"
          title="download"
        >
          <svg class="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          download
        </a>
      </template>

      <!-- Option (delete) -->
      <template #option>
        <ButtonCircle mode="danger" @klik="deleteFile(list)">
          <SVGIcon icon="trash" size="w-5 h-5" />
        </ButtonCircle>
      </template>
    </List>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

import default_file from '@/assets/images/default-file.webp'

export default {
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  components: {
    List: () => import(/* webpackChunkName: "components" */ '@/components/List'),
    ButtonCircle: () => import(/* webpackChunkName: "components" */ '@/components/ButtonCircle'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  computed: {
    ...mapState('file', [
        'show_option'
    ]),
    onArchives(){
      return this.$route.name === 'archives'
    }
  },
  methods: {
    setReferenceImage(e) {
      e.target.src = default_file
    },
    toggle(id) {
      const { commit } = this.$store
      if (this.show_option == id) {
        commit('file/SET_SHOW_OPTION', null)
      } else commit('file/SET_SHOW_OPTION', id)
    },
    deleteFile(data) {
      if (confirm('yakin ?')) {
        this.$store.dispatch('file/Delete', data)
      }
    },
    archiveFile(id, title){
      const status = this.onArchives ? false : true
      if(confirm(`apakah anda ingin archive file '${title}' ?`)){
        this.$store.dispatch('file/Archive', {id, status})
        this.$store.commit('file/SET_SHOW_OPTION', id)
      }
    }
  },
}
</script>

<style lang="postcss">
.file-list {
  @apply py-2 px-5 text-base tracking-wide text-left w-full;
}
</style>