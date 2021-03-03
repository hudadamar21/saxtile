<template>
  <ul class="file-list md:overflow-auto">
    <!-- jika list kosong -->
    <li v-if="!lists.length" class="text-center font-semibold text-gray-200 mt-5">
      Tidak ada file yang tersimpan.
    </li>

    <!-- list views -->
    <List
      v-else
      mode="dark"
      v-for="list of lists"
      :key="list.id"
      :data="list"
      :showOption="show_option"
      @toggle="(id) => toggle(id)"
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
          class="bg-white hover:bg-gray-200 text-gray-700 rounded px-2 py-1 mt-2 lg:mt-0"
          target="_blank"
        >
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
  components: {
    List: () => import(/* webpackChunkName: "components" */ '@/components/List'),
    ButtonCircle: () => import(/* webpackChunkName: "components" */ '@/components/ButtonCircle'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  computed: {
    ...mapState('file', [
        'lists',
        'show_option'
    ]),
  },
  methods: {
    setReferenceImage(e) {
      e.target.src = default_file
    },
    toggle(id) {
      const { commit } = this.$store
      if (this.show_option == id) {
        commit('file/setShowOption', null)
      } else commit('file/setShowOption', id)
    },
    deleteFile(data) {
      if (confirm('yakin ?')) {
        this.$store.dispatch('file/Delete', data)
      }
    },
  },
}
</script>

<style lang="postcss">
.file-list {
  @apply py-2 px-5 text-base tracking-wide text-left w-full;
}
</style>