(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["archives"],{"3b35":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("TextCollectionList",{attrs:{lists:t.archiveTextCollectionLists}})},s=[],l=(i("4de4"),i("d3b7"),{components:{TextCollectionList:function(){return i.e("collections").then(i.bind(null,"e4ab"))}},mounted:function(){0===this.lists.length&&this.$store.dispatch("text_collection/List")},computed:{lists:function(){return this.$store.state.text_collection.lists},archiveTextCollectionLists:function(){return this.lists.filter((function(t){return t.archived}))}}}),c=l,r=i("2877"),o=Object(r["a"])(c,n,s,!1,null,null,null);e["default"]=o.exports},"5fee":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("TextList",{attrs:{lists:t.archiveTextLists,isArchive:""}})},s=[],l=(i("4de4"),i("d3b7"),{components:{TextList:function(){return i.e("text").then(i.bind(null,"04f6"))}},mounted:function(){0===this.textlist.length&&this.$store.dispatch("text/List")},computed:{textlist:function(){return this.$store.state.text.lists},archiveTextLists:function(){return this.textlist.filter((function(t){return t.archived}))}}}),c=l,r=i("2877"),o=Object(r["a"])(c,n,s,!1,null,null,null);e["default"]=o.exports},b002:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("FileList",{attrs:{lists:t.archiveFileLists,isArchive:""}})},s=[],l=(i("4de4"),i("d3b7"),{components:{FileList:function(){return i.e("file").then(i.bind(null,"85b5"))}},mounted:function(){0===this.filelist.length&&this.$store.dispatch("file/List")},computed:{filelist:function(){return this.$store.state.file.lists},archiveFileLists:function(){return this.filelist.filter((function(t){return t.archived}))}}}),c=l,r=i("2877"),o=Object(r["a"])(c,n,s,!1,null,null,null);e["default"]=o.exports},b1ec:function(t,e,i){},bba4:function(t,e,i){"use strict";var n=i("b1ec"),s=i.n(n);s.a},dc0a:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("Layout",{attrs:{"no-indicator":""}},[i("section",{ref:"stext",staticClass:"stext-main h-screen w-full",attrs:{id:"archives"}},[i("div",{staticClass:"text-center mb-2 w-1/2",class:{"mb-4":t.selectedIsCollections}},[i("h1",{staticClass:"stext-title text-2xl py-1 md:py-0 md:text-3xl tracking-wider"},[t._v("ARCHIVES")]),i("SelectBase",{attrs:{value:t.selectedArchive,options:["text","file","text_collection","file_collection"]},on:{getvalue:function(e){return t.selectedArchive=e}}}),t.textIsUpdate?i("TextForm",{staticClass:"mt-2 w-full"}):t._e()],1),t.loadingList?i("Skeleton",{staticClass:"w-full md:w-2/3",attrs:{mode:"light",count:3}}):i("div",{staticClass:"w-full md:w-2/3 flex-grow overflow-auto"},["text"===t.selectedArchive?i("TextArchives"):"file"===t.selectedArchive?i("FileArchives"):"text_collection"===t.selectedArchive?i("TextCollectionArchives"):"file_collection"===t.selectedArchive?i("div",[i("div",{staticClass:"w-full text-center text-gray-600 dark:text-gray-300"},[i("h1",{staticClass:"font-bold text-2xl"},[t._v("Save File Collection")]),i("h3",{staticClass:"font-base"},[t._v("fitur ini sedang dikembangkan.")]),i("h3",{staticClass:"font-base"},[t._v("Stay tune..")])])]):t._e()],1)],1)])},s=[],l=(i("d3b7"),{title:"Saxtile Archives",components:{SelectBase:function(){return i.e("components").then(i.bind(null,"4c2b"))},TextForm:function(){return i.e("text").then(i.bind(null,"085a"))},TextArchives:function(){return Promise.resolve().then(i.bind(null,"5fee"))},FileArchives:function(){return Promise.resolve().then(i.bind(null,"b002"))},TextCollectionArchives:function(){return Promise.resolve().then(i.bind(null,"3b35"))}},data:function(){return{selectedArchive:"text"}},watch:{selectedArchive:function(t,e){"text"===e&&this.$store.commit("text/SET_IS_UPDATE",!1)}},computed:{loadingList:function(){return this.$store.state.text.loadingList},textIsUpdate:function(){return this.$store.state.text.isUpdate},selectedIsCollections:function(){return"text_collection"===this.selectedArchive||"file_collection"===this.selectedArchive}}}),c=l,r=(i("bba4"),i("2877")),o=Object(r["a"])(c,n,s,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=archives.2786c650.js.map