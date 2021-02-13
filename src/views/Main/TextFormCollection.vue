<template>
  <Modal 
    :title="`${data ? 'Edit' : ''} Text Collection`" 
    @closemodal="closeModal">

    <template #body>

      <!-- input title and prefix -->
      <div class="flex flex-col mb-3">
        <div class="flex items-center w-full sm:w-8/12 mb-3">
          <h3 class="mr-2 text-base w-2/12 lg:w-1/12">Title</h3>
          <Input 
            name="Title" 
            :value="textCollection.title" 
            class="w-full"
            @getval="val => textCollection.title = val"/>
        </div>
        <div class="flex items-center w-full sm:w-8/12">
          <h3 class="mr-2 text-base w-2/12 lg:w-1/12">Prefix</h3>
          <Input 
            name="add prefix for same base link. (https://example.com/)" 
            :value="textCollection.prefix"
            @getval="val => textCollection.prefix = val"
            class="w-full"/>
        </div>
      </div> 
      <!-- END input title and prefix -->
      
      <!-- wrapper text collections -->
      <div class="overflow-auto overflow-x-hidden height-textCollection w-full">
        <div v-for="(text, index) of textCollection.content" :key="index" class="flex items-center mx-2 md:mx-8 w-full">
        <div class="mr-1 font-semibold text-sm w-5">{{ index + 1 }}.</div>
          <div class="relative my-1 w-11/12">

            <!-- wrapper input text -->
            <div class="w-full flex justify-center items-center">

              <!-- prefix text -->
              <div 
                v-if="textCollection.prefix" 
                class="bg-gray-200 rounded-l shadow h-8 overflow-hidden text-base py-1 px-2 max-w-sm text-gray-600 hidden sm:block" 
                :class="{'truncate' : textCollection.prefix.length >= 40}">
               {{ textCollection.prefix }}
              </div>

              <!-- input text -->
              <Input 
                v-if="textCollection.content.length - 1 == index"
                @keyup.enter.native="addNewText(() => $refs[`text${index+1}`][0].$el.focus())"
                name="input your text or link" 
                :value="text"
                :ref="'text'+index"
                @getval="value => changeValueOfIndex(value, index)"
                class="w-full"/>
              <Input 
                v-else
                name="input your text or link" 
                :value="text"
                :ref="'text'+index"
                @getval="value => changeValueOfIndex(value, index)"
                class="w-full"/>

            </div> 
            <!-- END input text -->

            <!-- delete text -->
            <ButtonCircle
              v-if="index !== 0"
              mode="danger" 
              class="absolute-vertical-center text-sm"
              size="sm"
              @klik="deleteListOfIndex(index)"
            >
              <SVGIcon icon="x" color="text-white" size="w-4 h-4"/>
            </ButtonCircle>
            <!-- END delete text -->

            <!-- add new text -->
            <Button
              v-if="textCollection.content.length - 1 == index" 
              color="blue" 
              sm 
              class="mt-1 text-right absolute -bottom-5 right-0" 
              @click.native="addNewText(() => $refs[`text${index+1}`][0].$el.focus())">
              + Add New
            </Button>
            <!-- END add new text -->

          </div>
        </div>
      </div> 
      <!-- END wrapper text collections -->

    </template>

    <template #footer>

      <!-- save text collection -->
      <div class="flex items-center justify-end h-full">
        <Button 
          color="green" 
          lg 
          class="justify-self mx-3"
          @click.native="$emit('action', textCollection)">
          {{ data ? 'Update' : 'Save'}} Collection
        </Button>
      </div>
      <!-- END save text collection -->
      
    </template>
  
  </Modal>
</template>

<script>

import {
  Button,
  ButtonCircle,
  Input,
  Modal,
  SVGIcon
} from "@/components"

export default {
  props: {
    data: Object
  },
  components: {
    Modal,
    Button,
    Input,
    ButtonCircle,
    SVGIcon
  },
  data(){
    return {
      textCollection: {
        title: '',
        prefix: '',
        content:  [''],
        type: 'collection',
        date: ''
      }
    }
  },
  created(){
    if(this.data){
      const {title, prefix, content, date} = this.data
      this.textCollection = {
        title,
        prefix,
        content,
        type: 'collection',
        date
      }
    }
  },
  methods: {
    changeValueOfIndex(value, index){
      this.textCollection.content[index] = value
    },
    addNewText(callback){
      this.textCollection.content.push('')
      setTimeout(() => callback(), 1);
    },
    deleteListOfIndex(index){
      this.textCollection.content = this.textCollection.content.filter((text, i) => i != index)
    },
    saveCollections(){
      let {title,content} = this.textCollection
      let validateInput = title && content.filter(text => text).length > 0 ? true : false
      if(validateInput){
        this.textCollection.date = new Date().getTime()
        console.log(this.textCollection)
        this.$store.dispatch('text/Save', this.textCollection, {root: true})
      } else {
        alert('input required')
      }
    },
    closeModal(){
      let {title,prefix,content} = this.textCollection
      if(!title && !prefix && content.filter(text => text).length < 1){
        this.$emit('close', false)
      } else {
        let message = 'Close akan menghapus collection yang telah di tulis, Apakah anda Yakin ?'
        window.confirm(message) ? this.$emit('close', false) : false
      }
    }
  }
}
</script>

<style>
  .-bottom-5{
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
</style>