<template>
<!-- Colors Picker Button -->
<div class="relative z-10" id="colorPicker">
	<div 
		@click.stop="showColorPicker = !showColorPicker" 
		class="color-picker-button" 
		:class="isNoColor 
			? 'border border-red-400 bg-white' 
			: {
					'bg-red-500': noteOpened.color === 'red',
					'bg-blue-500': noteOpened.color === 'blue',
					'bg-green-500': noteOpened.color === 'green',
					'bg-yellow-500': noteOpened.color === 'yellow',
					'bg-gray-500': noteOpened.color === 'gray',
				}"
	>
		<div v-if="isNoColor" class="no-color w-px"></div>
	</div>
	<!-- color pickers -->
	<transition name="opacity">
		<div v-if="showColorPicker" class="color-picker" v-click-outside="closeColorPicker">
			<div class="flex flex-wrap w-64 gap-1 p-1">
				<template v-for="color of colorList">
					<div
						v-if="color !== 'no-color'"
						:key="color"
						@click="$emit('changecolor', color)"
						class="color-size" 
						:class="{
							'bg-red-500': color === 'red',
							'bg-blue-500': color === 'blue',
							'bg-green-500': color === 'green',
							'bg-yellow-500': color === 'yellow',
							'bg-gray-500': color === 'gray',
						}">
					</div>
					<div 
						v-else
						:key="color"
						@click="$emit('changecolor', color)"
						class="relative color-size border-2 bg-white border-red-400 overflow-hidden"
					>
						<div class="no-color w-0.5">
						</div>
					</div>
				</template>
			</div>
		</div>
	</transition>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data(){
		return {
			showColorPicker: false
		}
	},
	computed: {
		...mapState('note', [
			'colorList',
			'noteOpened',
			'updatedNoteId'
		]),
		isNoColor(){
			return !this.noteOpened.color || this.noteOpened.color === 'no-color'
		}
	},
	methods: {
		closeColorPicker(){
			if(this.showColorPicker){
				console.log('ok');
				this.showColorPicker = false
			}
		}
	}
}
</script>

<style lang="postcss">
	.color-picker-button {
		@apply relative w-6 h-6 shadow overflow-hidden cursor-pointer
	}
	.color-picker {
		@apply absolute top-full mt-2 right-0 bg-white dark:bg-gray-600 rounded-sm shadow-lg
	}
	.no-color {
		@apply absolute top-1/2 left-1/2 h-32 bg-red-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45
	}
	.color-size {
		@apply w-20 h-20 cursor-pointer
	}
</style>