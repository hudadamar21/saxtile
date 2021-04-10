<template>
<section 
	class="absolute md:static h-screen border-l-2 w-full md:w-8/12 dark:bg-gray-600 z-50 md:z-auto dark:border-gray-600"
	:class="noteOpened ? 'block' : 'hidden md:block'"
>
	<!-- Jika Tidak Ada Note Yang Dibuka -->
	<div v-if="!noteOpened" class="flex h-screen justify-center items-center">
		<h1 class="text-blue-400 dark:text-white text-2xl font-bold flex items-center">
			<SVGIcon icon="arrow-left" size="w-8 h-8" /> 
			<span class="ml-2">Select A Note...</span>
		</h1>
	</div>

	<!-- Jika Ada Note Yang Dibuka -->
	<div v-else class="h-screen bg-white overflow-hidden">

		<!-- Header -->
		<div 
			class="w-full h-title flex items-center justify-between text-xl"
			:class="`
				${noteOpened ? 'flex' : 'hidden'}
				${editmode 
					? editmodeHeaderBackground 
					: headerBackground 
				} 
				${editmode 
					? darkEditmodeHeaderBackground 
					: darkHeaderBackground 
				}
				${noteColor === 'no-color' ? 'border-b bg-gray-100 dark:bg-gray-600 dark:border-0' : ''}
			`">

			<div class="flex items-center w-full">
				<div 
					class="ml-2 text-gray-700 dark:text-gray-100 cursor-pointer hover:bg-white hover:bg-opacity-20 p-1 rounded-full"
					@click="closeNote"
				>
					<SVGIcon icon="arrow-left" size="w-6 h-6"></SVGIcon>
				</div>

				<!-- Title -->
				<input
					type="text" v-model="noteOpened.title"
					placeholder="type your title" 
					class="ml-2 border-none focus:outline-none px-3 py-1 disabled:bg-transparent dark:disabled:text-gray-100 font-semibold rounded w-2/3 text-gray-700"
					:class="editmode 
										? 'bg-white placeholder-gray-400 disabled:bg-white' 
										: `text-gray-700 placeholder-white`"
					:disabled="!editmode"
				/>
			</div>

			<!-- Options -->
			<div class="mr-5 flex items-center">

				<ButtonCircle 
					v-if="!editmode" 
					@click.native="setEditMode(!editmode)" 
					mode="none" md>
						<SVGIcon icon="pancil" size="w-6 h-6" color="dark:text-gray-100"/>
				</ButtonCircle>
				<ButtonCircle 
					v-else 
					@click.native="submitNote" 
					mode="none" md>
					<SVGIcon icon="check" size="w-6 h-6" color="dark:text-gray-100"/>
				</ButtonCircle>

				<ButtonCircle 
					v-if="updatedNoteId" 
					@click.native="deleteNote" 
					mode="none" md>
					<SVGIcon icon="trash" size="w-6 h-6" color="dark:text-gray-100"/>
				</ButtonCircle>

				<ColorPicker :colorSelected="noteColor" @changecolor="changeNoteColor"/>

			</div>
		</div>
		<!-- End Header -->
		
		<!-- Note Open -->
		<div 
			class="relative h-note w-full p-2 pb-0 mb-5 dark:bg-gray-700" 
			:class="noteBackground">
			<div class="absolute top-0 left-0 px-3 pt-px flex items-center justify-between w-full text-sm text-gray-400 py-0">
				<p>{{ editmode ? 'sedang di sunting' : timePassed }}</p>
				<p>{{ new Date().formatDate(noteOpened.date) }}</p>
			</div>
			<div 
				class="p-5 pb-0 px-2" 
				@dblclick="!editmode ? setEditMode(true) : false">
				<textarea
					ref="note-editor"
					class="text-editor dark:text-white bg-transparent w-full overflow-auto focus:outline-none placeholder-gray-400 text-lg resize-none"
					rows="20" 
					placeholder="write something..."
					:disabled="!editmode"
					v-model="noteOpened.note"
				></textarea>
			</div>
		</div>

	</div>
</section>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
	components: {
		ColorPicker: () => import(/* webpackChunkName: "components" */ '@/components/ColorPicker'),
	},
	computed: {
		...mapState('note', [
			'noteOpened',
			'editmode',
			'noteColor',
			'updatedNoteId'
		]),
		headerBackground(){
			return this.noteOpened.color === 'red' ? 'bg-red-300'
				: this.noteOpened.color === 'blue' ? 'bg-blue-300'
				: this.noteOpened.color === 'green' ? 'bg-green-300'
				: this.noteOpened.color === 'yellow' ? 'bg-yellow-300'
				: this.noteOpened.color === 'gray' ? 'bg-gray-300'
				: 'bg-white'
		},
		editmodeHeaderBackground(){
			return this.noteOpened.color === 'red' ? 'bg-red-400'
				: this.noteOpened.color === 'blue' ? 'bg-blue-400'
				: this.noteOpened.color === 'green' ? 'bg-green-400'
				: this.noteOpened.color === 'yellow' ? 'bg-yellow-400'
				: this.noteOpened.color === 'gray' ? 'bg-gray-400'
				: 'bg-gray-100'
		},
		darkHeaderBackground(){
			return this.noteOpened.color === 'red' ? 'dark:bg-red-800'
				: this.noteOpened.color === 'blue' ? 'dark:bg-blue-800'
				: this.noteOpened.color === 'green' ? 'dark:bg-green-800'
				: this.noteOpened.color === 'yellow' ? 'dark:bg-yellow-800'
				: this.noteOpened.color === 'gray' ? 'dark:bg-gray-800'
				: 'bg-white'
		},
		darkEditmodeHeaderBackground(){
			return this.noteOpened.color === 'red' ? 'dark:bg-red-900'
				: this.noteOpened.color === 'blue' ? 'dark:bg-blue-900'
				: this.noteOpened.color === 'green' ? 'dark:bg-green-900'
				: this.noteOpened.color === 'yellow' ? 'dark:bg-yellow-900'
				: this.noteOpened.color === 'gray' ? 'dark:bg-gray-900'
				: 'bg-gray-100'
		},
		noteBackground(){
			return this.noteOpened.color === 'red' ? 'bg-red-100'
				: this.noteOpened.color === 'blue' ? 'bg-blue-100'
				: this.noteOpened.color === 'green' ? 'bg-green-100'
				: this.noteOpened.color === 'yellow' ? 'bg-yellow-100'
				: this.noteOpened.color === 'gray' ? 'bg-gray-100'
				: 'bg-white'
		},
		timePassed(){
			const selisih = new Date().getTime() - this.noteOpened.date
			const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
			const jam = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
			return hari > 0 
				? `${hari} hari yang lalu` 
				: jam > 0 ? `${jam} jam yang lalu`
				: 'baru saja'
		}
	},
	methods: {
		...mapMutations('note', ['setEditMode','setNoteOpened']),
		...mapActions('note', ['Save', 'Update','Delete']),
		submitNote(){
			if(!this.noteOpened.title){
				alert('title required')
			} else {
				if (!this.updatedNoteId) {
					this.Save(this.noteOpened)
						this.setEditMode(false)
				} else {
					const {title, note} = this.noteOpened

					const updatedNote = {
						title,
						note,
						date: new Date().getTime()
					}
					
					this.Update(updatedNote)
					this.setEditMode(false)
				} 
			}
			
		},
		async changeNoteColor(color){
			if(this.updatedNoteId) await this.$store.dispatch('note/Update', {color})
			this.$store.commit('note/setNoteColor', color)
		},
		closeNote(){
			if(this.editmode){
				const confirm = window.confirm('apakah anda ingin membatalkan pengeditan?')
				if(confirm) {
					this.setNoteOpened(null)
					this.setEditMode(false)
				}
			} else {
				this.setNoteOpened(null)
				this.setEditMode(false)
			}
		},
		deleteNote(){
			if(confirm('apakah anda ingin menghapus note ini ?')){
				this.Delete(this.updatedNoteId)
			}
		}
	}
}
</script>

<style>
	.h-title {
		height: 3rem
	}
	.h-note {
		height: calc(100vh - 3rem);
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.text-editor::-webkit-scrollbar {
	  display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.text-editor {
	  -ms-overflow-style: none;  /* IE and Edge */
	  scrollbar-width: none;  /* Firefox */
	}
</style>