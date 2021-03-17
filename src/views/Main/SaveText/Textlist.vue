<template>
  <ul class="text-list md:overflow-auto">
    <!-- jika list kosong -->
    <li v-if="!lists.length" class="text-center font-semibold text-gray-700 mt-5">
      Tidak ada {{ isArchive ? 'archive' : '' }} text yang tersimpan.
    </li>

    <!-- list views -->
    <List
      v-else
      v-for="list of lists"
      :mode="checkDarkmode ? 'dark' : 'light'"
      :key="list.id"
      :data="list"
      :showOption="showOption"
      :isUpdate="isUpdate"
      @archive="(id) => archiveText(id, !list.archived)"
      @toggle="toggle"
    >
      <!-- Content (title and date) -->
      <template #content>
        <div class="flex flex-col mb-2 lg:mb-0 w-full overflow-hidden">
          <div class="mb-1">
            <h3 class="font-bold">{{ list.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-xs">
              {{ new Date().formatDate(list.date) }}
            </p>
          </div>
          <p class="overflow-hidden" :class="{ 'text-blue-500 dark:text-blue-300': isUrl(list.content) }">
            {{ list.content }}
          </p>
        </div>
      </template>

      <!-- action (copy and goto) -->
      <template #action>
        <div class="flex items-center">
          <Button
            padding="px-2 py-1"
            class="flex gap-1"
            :color="checkDarkmode ? 'white' : 'green'" 
            @click.stop.native="copyText(list.content, list.id)" sm
            title="copy"
            >
            <svg v-if="textCopied == list.id" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            {{ textCopied == list.id ? 'copied' : 'copy' }}
          </Button>
          <a
            v-if="isUrl(list.content)"
            @click.stop
            class="bg-blue-500 dark:bg-white dark:hover:bg-gray-200 hover:bg-blue-600 rounded p-1 text-white dark:text-gray-700 ml-2 flex items-center text-sm"
            :href="list.content"
            target="_blank"
            title="go to link"
          >
            <SVGIcon icon="goto" size="w-5 h-5" />
          </a>
        </div>
      </template>

      <!-- options (edit, delete) -->
      <template #option>
        <div>
          <ButtonCircle :mode="checkDarkmode ? '' : 'warning'" @klik="editText(list)">
            <SVGIcon icon="pancil" size="w-5 h-5" />
          </ButtonCircle>
          <ButtonCircle mode="danger" @klik="deleteText(list.id)">
            <SVGIcon icon="trash" size="w-5 h-5" />
          </ButtonCircle>
        </div>
      </template>
    </List>
  </ul>
  <!-- End List Text -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import action_text from '@/mixins/action_text'
import check_darkmode from '@/mixins/check_darkmode'


export default {
  props: {
    lists: {
      type: Array,
      required: true
    },
    isArchive: Boolean
  },
  mixins: [action_text, check_darkmode],
  components: {
    List: () => import(/* webpackChunkName: "components" */ '@/components/List'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    ButtonCircle: () => import(/* webpackChunkName: "components" */ '@/components/ButtonCircle'),
  },
  data() {
    return {
      textCopied: null,
    }
  },
  computed: {
    ...mapState({
      isUpdate: (state) => state.text.isUpdate,
      showOption: (state) => state.text.showOption,
    }),
  },
  methods: {
    ...mapMutations('text', {
      setIsUpdate: 'SET_IS_UPDATE',
      setInput: 'SET_INPUT',
      setUpdateTextId: 'SET_UPDATE_TEXT_ID',
      setShowOption: 'SET_SHOW_OPTION',
    }),
    
    editText({ title, content, id }) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.setIsUpdate(true)
      this.setInput({ title, content })
      this.setUpdateTextId(id)
    },

    deleteText(id) {
      if (confirm('yakin ?')) {
        this.$store.dispatch('text/Delete', id)
        this.setIsUpdate(false)
        this.setInput({ title: '', content: '' })
      }
    },

    toggle(id) {
      if (!this.isUpdate && this.showOption == id) {
        this.setShowOption(null)
      } else {
        if (this.isUpdate) {
          this.setIsUpdate(false)
          this.setShowOption(null)
          this.setInput({ title: '', content: '' })
        } else this.setShowOption(id)
      }
    },

    archiveText(id, status){
      this.$store.dispatch('text/Archive', {id, status})
      this.setShowOption(id)
    }
  },
}
</script>

<style>
</style>