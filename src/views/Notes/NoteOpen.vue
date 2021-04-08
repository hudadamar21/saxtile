<template>
<section 
	class="absolute md:static h-screen border-l-2 w-full md:w-8/12 dark:bg-gray-600 z-50"
	:class="`
		${noteOpened ? 'block' : 'hidden md:block'}
		${colorMode('border', noteColor, editmode ? '400' : '300')}
	`"
>
	<!-- Jika Tidak Ada Note Yang Dibuka -->
	<div v-if="!noteOpened" class="flex h-screen justify-center items-center">
		<h1 class="text-blue-400 dark:text-white text-2xl font-bold flex items-center">
			<SVGIcon icon="arrow-left" size="w-8 h-8" /> 
			<span class="ml-2">Select A Note...</span>
		</h1>
	</div>

	<!-- Jika Ada Note Yang Dibuka -->
	<div v-else class="h-screen bg-white">

		<!-- Header -->
		<div 
			class="w-full h-title flex items-center justify-between text-xl"
			:class="`
				${noteOpened ? 'flex' : 'hidden'}
				${colorMode('bg',noteColor, editmode ? '400' : '300')} 
				${noteColor === 'no-color' ? 'border-b bg-gray-100' : ''}
			`">

			<div class="flex items-center w-full">
				<div 
					class="ml-2 text-gray-700 cursor-pointer hover:bg-white hover:bg-opacity-20 p-1 rounded-full"
					@click="closeNote"
					>
					<SVGIcon icon="arrow-left" size="w-6 h-6"></SVGIcon>
				</div>

				<!-- Title -->
				<input
					type="text" v-model="noteOpened.title"
					placeholder="type your title" 
					class="ml-2 border-none focus:outline-none px-3 py-1 font-semibold rounded w-2/3  text-gray-700"
					:class="editmode 
										? 'bg-white placeholder-gray-400 disabled:bg-white' 
										: `text-gray-700 ${colorMode('bg',noteColor, 300)} ${colorMode('disabled:bg', noteColor, 300)} placeholder-white`"
					:disabled="!editmode"
				/>
			</div>

			<!-- Options -->
			<div class="mr-5 flex items-center">	
				<ButtonCircle 
					v-if="!editmode" 
					@click.native="setEditMode(!editmode)" 
					mode="none" md textColor="text-gray-500">
						<SVGIcon icon="pancil" size="w-6 h-6"/>
				</ButtonCircle>
				<ButtonCircle 
					v-else 
					@click.native="submitNote" 
					mode="none" md textColor="text-gray-500">
					<SVGIcon icon="check" size="w-6 h-6"/>
				</ButtonCircle>

				<ButtonCircle 
					v-if="updatedNoteId" 
					@click.native="deleteNote" 
					mode="none" md textColor="text-gray-500">
					<SVGIcon icon="trash" size="w-6 h-6"/>
				</ButtonCircle>

				<ColorPicker :colorSelected="noteColor" />

			</div>
		</div>
		<!-- End Header -->
		
		<!-- Note Open -->
		<div class="relative h-note w-full p-2 mb-5" :class="colorMode('bg',noteColor, 100)">
			<div class="absolute top-0 left-0 px-3 pt-px flex items-center justify-between w-full text-sm text-gray-400 py-0">
				<p>{{ editmode ? 'sedang di sunting' : timePassed }}</p>
				<p>{{ new Date().formatDate(noteOpened.date) }}</p>
			</div>
			<div 
				class="p-5 px-2" 
				@dblclick="!editmode ? setEditMode(true) : false">
				<textarea
					ref="note-editor"
					class="text-editor bg-transparent w-full overflow-auto focus:outline-none placeholder-gray-400 text-lg resize-none"
					rows="19" 
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
			'updatedNoteId'
		]),
		noteColor(){
			return this.noteOpened?.color
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
	watch: {
		noteOpened(newval){
			console.log(newval);
		}
	},
	methods: {
		...mapMutations('note', ['setEditMode','setNoteOpened']),
		...mapActions('note', ['Save', 'Update','Delete']),
		submitNote(){
			if (!this.updatedNoteId) {
				if(!this.noteOpened.title){
					alert('input required')
				} else {
					this.Save(this.noteOpened)
					this.setEditMode(false)
				}
			} else {
				const updatedNote = this.noteOpened
				delete updatedNote['id']
				this.Update(updatedNote)
				this.setEditMode(false)
			} 
		},
		closeNote(){
			this.setNoteOpened(null)
		},
		deleteNote(){
			if(confirm('apakah anda ingin menghapus note ini ?')){
				this.Delete(this.updatedNoteId)
			}
		},
		colorMode(property, color, size){
			return `${property}-${color}-${size}`
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