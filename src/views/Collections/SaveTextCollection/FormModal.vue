<template>
  <Modal
    :title="`${is_update ? 'Edit' : ''} Text Collection`"
    class="z-40 text-gray-700 dark:text-gray-100"
    @closemodal="closeModal"
  >

    <template #body>
      <!-- Wrapper Input Title and Prefix + Options -->
      <div class="flex flex-col md:flex-row w-full mb-3">
        <div class="w-full md:w-2/3">

          <!-- Title Input -->
          <div class="flex flex-col md:flex-row items-start md:items-center w-full mb-1 md:mb-3">
            <h3 class="text-base mr-2 w-1/12">Title</h3>
            <Input
              name="type your title"
              :value="textCollection.title"
              class="w-full"
              @getval="(val) => (textCollection.title = val)"
            />
          </div>

          <!-- Prefix Input -->
          <div class="flex flex-col md:flex-row items-start md:items-center w-full">
            <h3 class="mr-1 text-base mr-2 w-1/12">Prefix</h3>
            <Input
              name="add prefix for same base link. (https://example.com/)"
              :value="textCollection.prefix"
              @getval="(val) => (textCollection.prefix = val)"
              class="w-full"
            />
          </div>
        </div>

        <!-- Options -->
        <div class="mt-2 md:mt-0 ml-2 md:ml-4 flex flex-col justify-start items-start gap-2">
          <div class="flex justify-center items-center">
            <ButtonSwitch 
              :state="withSubtitle"  
              @switch="(value) => withSubtitle = value" 
            >
            </ButtonSwitch>
            <p class="ml-3 text-base">with subtitle</p>
          </div>
        </div>

      </div>
      <!-- END Wrapper Input Title and Prefix + Options -->

      <!-- Wrapper Text Collections Inputs -->
      <ul
        class="overflow-auto overflow-x-hidden height-textCollection w-full">

        <li
          class="flex items-center justify-center w-full"
          v-for="({subtitle, text}, index) of textCollection.contents"
          :key="index">

          <!-- Increment Numbers -->
          <div class="mr-1 font-semibold text-sm w-5">{{ index + 1 }}.</div>

          <div class="relative my-1 w-11/12">
            <!-- Wrapper Input Text -->
            <div class="w-full flex">

              <!-- Input Subtitle -->
              <transition name="subtitle-show">
                <div v-if="withSubtitle" class="w-1/3 flex justify-center items-center mr-1">
                  <Input
                    @keyup.enter.native="focusedToNewText(index)"
                    name="subtitle"
                    :value="subtitle || ''"
                    :ref="'text' + index"
                    @getval="(value) => changeSubtitleOfIndex(value, index)"
                    class="w-full"
                  />
                </div>
              </transition>

              <!-- Input Text -->
              <div class="w-full flex justify-center items-center">
                <Input
                  @keyup.enter.native="focusedToNewText(index)"
                  name="input your text or link"
                  :value="text"
                  :ref="'text' + index"
                  @getval="(value) => changeTextOfIndex(value, index)"
                  class="w-full"
                />
              </div>

            </div>
            <!-- End Wrapper Input Text -->

            <!-- Delete Text -->
            <ButtonCircle
              v-if="index !== 0"
              mode="danger"
              class="absolute-vertical-center text-sm"
              size="sm"
              @klik="deleteListOfIndex(index)">
                <SVGIcon icon="x" color="text-white dark:text-gray-800" size="w-4 h-4" />
            </ButtonCircle>

            <!-- Add New Text -->
            <Button
              v-if="textCollection.contents.length - 1 == index"
              color="blue" sm
              class="mt-1 text-right absolute -bottom-5 right-0"
              @click.native="addNewText(() => $refs[`text${index + 1}`][0].$el.focus())">
                + Add New
            </Button>

          </div>
        </li>
      </ul>
      <!-- END Wrapper Text Collections Inputs -->
    </template>

    <template #footer>
      <!-- Save Text Collection -->
      <div class="flex items-center justify-end h-full">
        <Button color="green" lg class="justify-self mx-3" @click.native="submitCollection">
          {{ is_update ? 'Update' : 'Save' }} Collection
        </Button>
      </div>
      <!-- END Save Text Collection -->
    </template>
    
  </Modal>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    data: Object,
  },
  components: {
    Modal: () => import(/* webpackChunkName: "components" */ '@/components/Modal'),
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    ButtonSwitch: () => import(/* webpackChunkName: "components" */ '@/components/ButtonSwitch'),
    Input: () => import(/* webpackChunkName: "components" */ '@/components/Input'),
    ButtonCircle: () => import(/* webpackChunkName: "components" */ '@/components/ButtonCircle'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  data() {
    return {
      withSubtitle: false,
      textCollection: {
        title: '',
        prefix: '',
        contents: [
          {
            subtitle: '',
            text: ''
          }
        ],
        archived: false,
        date: '',
      },
    }
  },
  computed: {
    ...mapState('text_collection', ['collection_data', 'is_update']),
    validateInput() {
      const { title, contents } = this.textCollection
      return title && contents.filter(content => content).length > 0 ? true : false
    },
    
  },
  created() {
    if (this.is_update) {
      this.textCollection = JSON.parse(window.localStorage.getItem('collection_data'))
    }
    if(this.textCollection?.contents[0]?.subtitle){
      this.withSubtitle = true
    }
  },
  methods: {

    ...mapMutations('text_collection', {
      setCollectionData: 'SET_COLLECTION_DATA',
      setOpenCollection: 'SET_OPEN_COLLECTION',
      setShowFormModal: 'SET_SHOW_FORM_MODAL',
      setIsUpdate: 'SET_IS_UPDATE',
    }),

    ...mapActions('text_collection', [
      'Save', 
      'Update'
      ]),

    changeSubtitleOfIndex(value, index){
      this.textCollection.contents[index].subtitle = value
    },  

    changeTextOfIndex(value, index) {
      this.textCollection.contents[index].text = value
    },

    addNewText(callback) {
      const newText = this.withSubtitle 
        ? {subtitle: '',text: ''} 
        : {text: ''}
      this.textCollection.contents.push(newText)
      setTimeout(() => callback(), 1)
    },

    focusedToNewText(index){
      return this.textCollection.contents.length - 1 == index 
        ? this.addNewText(() => this.$refs[`text${index + 1}`][0].$el.focus()) 
        : false
    },

    deleteListOfIndex(index) {
      this.textCollection.contents = this.textCollection.contents.filter((_, i) => i != index)
    },

    submitCollection() {
      
      if (this.validateInput) {
        this.textCollection.date = new Date().getTime()

        // check if not withsubtitle, delete subtitle on object of array
        if(!this.withSubtitle){
          this.textCollection.contents.forEach(content => {
            delete content.subtitle
          })
        }
        
        // save updated text collection
        if (this.is_update && this.collection_data.id) {
          const updatedCollection = {
            id: this.collection_data.id,
            data: this.textCollection,
          }
          this.Update(updatedCollection)
          this.setIsUpdate(false)
          this.setCollectionData(null)
          this.setOpenCollection(false)
          
        // save new text collection
        } else {
          this.Save(this.textCollection)
        }
        
        this.setShowFormModal(false)
      } else {
        alert('input is required')
      }
    },

    closeModal() {
      this.setCollectionData(this.collection_data)
      let { title, prefix, contents } = this.textCollection
      if (!title && !prefix && contents.filter(content => content).length <= 1) {
        this.$emit('closemodal', false)
      } else {
        let message = 'Close akan menghapus collection yang telah di tulis, Apakah anda Yakin ?'
        window.confirm(message) ? this.$emit('closemodal', false) : false
      }
    },

  },
}
</script>

<style>
.-bottom-5 {
  bottom: -2.25rem;
}
.absolute-vertical-center {
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
}
.height-textCollection {
  height: 24rem;
}

.invert-color {
  filter: invert(0.85);
}

.subtitle-show-enter, .subtitle-show-leave-to {
  width: 0;
  opacity: 0;
}

.subtitle-show-enter-active, .subtitle-show-leave-active {
  transition-property: width, opacity;
  transition:  .3s ease-in-out;
}

.list-enter, .list-leave-to {
  transform: translateY(-30px) scale(0.99);
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition-property: transform, opacity;
  transition:  .2s ease-in-out;
}

.list-move {
  transition: .2s ease-in-out;
}
</style>