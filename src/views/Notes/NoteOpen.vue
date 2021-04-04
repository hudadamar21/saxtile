<template>
<section class="h-screen border-l-2 border-gray-300 w-full md:w-8/12 bg-gray-100 dark:bg-gray-600">

	<!-- jika tidak ada note yang dibuka -->
	<div v-if="!noteOpened" class="flex h-screen justify-center items-center">
		<h1 class="text-blue-400 text-2xl font-bold flex items-center">
			<SVGIcon icon="arrow-left" size="w-8 h-8" /> 
			<span class="ml-2">Pilih Note...</span>
		</h1>
	</div>

	<!-- jika ada note yang dibuka -->
	<div v-else class="h-screen">
		<div class="w-full h-title flex items-center justify-between bg-gray-200 text-xl">

			<!-- title -->
			<input
				type="text" v-model="noteOpened.title"
				placeholder="type your title" 
				class="ml-2 border-none focus:outline-none px-3 py-1 font-semibold rounded w-2/3"
				:class="editmode 
									? 'text-gray-600 bg-white placeholder-gray-400' 
									: 'text-gray-600 bg-gray-200 placeholder-white'"
				:disabled="!editmode"
			/>

			<!-- options -->
			<div class="mr-3 flex items-center">
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
			</div>

		</div>

		<!-- note open -->
		<div class="h-note w-full bg-gray-100 p-2 mb-5">
			<div 
				class="bg-white p-3 rounded shadow-md" 
				:class="editmode ? 'border border-gray-400' : 'border'"
				@dblclick="!editmode ? setEditMode(true) : false">
				<textarea
					ref="note-editor"
					class="w-full bg-white overflow-auto focus:outline-none placeholder-gray-400 text-lg" 
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
		SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
		ButtonCircle: () => import(/* webpackChunkName: "components" */ '@/components/ButtonCircle'),
	},
	computed: {
		...mapState('note', [
			'noteOpened',
			'editmode',
			'updatedNoteId'
		])
	},
	methods: {
		...mapMutations('note', ['setEditMode']),
		...mapActions('note', ['Save', 'Update','Delete']),
		submitNote(){
			this.setEditMode(false)

			if (!this.updatedNoteId) {
				this.Save(this.noteOpened)
			} else {
				const updatedNote = this.noteOpened
				delete updatedNote['id']
				this.Update(updatedNote)
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
	textarea {
		resize: none;
	}
</style>