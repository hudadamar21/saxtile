<template>
	<div id="home" class="min-h-screen bg-gradient-to-tr from-blue-900 to-blue-600 text-white">
		<!-- header -->
		<div class="fixed top-0 left-0 right-0 flex justify-between items-center bg-blue-600 h-14 shadow px-5">
			<div class="flex items-center">
				<img src="@/assets/images/logo-saxtile.png" alt="logo saxtile" class="h-9 w-9">
				<h1 class="font-semibold text-2xl ml-2 tracking-widest">Saxtile</h1>
			</div>
			<router-link 
				to="/auth"
				class="hover:bg-white hover:bg-opacity-10 rounded-md px-3 py-1	hover:shadow-sm transition duration-200"
			>
				Go to App
			</router-link>
		</div>
		<!-- body -->
		<div class="flex flex-col justify-start items-center min-h-screen w-full pt-20 md:pt-40">
			<!-- hero -->
			<div class="flex flex-col md:flex-row items-center justify-center mb-12">
				<img src="img/icons/android-chrome-512x512.png" alt="logo saxtile" class="h-56 w-56">
				<div class="md:ml-8 mt-3 md:mt-0 font-bold text-center md:text-left">
					<h1 class="text-6xl md:text-8xl tracking-wider">Saxtile</h1>
					<h3 class="text-2xl md:text-5xl tracking-wider">Web Application</h3>
					<div class="mt-5 flex items-center gap-3">
						<router-link to="/auth">
							<Button color="blue" lg>
								GO TO APP
							</Button>
						</router-link>
						<a href="https://github.com/hudadamar21/saxtile" target="_blank">
							<Button color="green" lg class="flex items-center" >
								GITHUB
								<svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
							</Button>
						</a>
					</div>
				</div>
			</div>

			<!-- webapp dibuat dengan -->
			<div class="text-center text-xl text-gray-100">
				<h1 class="mb-3">Web App ini dibuat dengan : </h1>
				<div class="grid grid-cols-3 gap-2">
					<div class="card-logo">
						<img src="img/logo/vuejs.png" alt="logo-vuejs" class="h-10 p-1">
						<p>Vuejs</p>
					</div>
					<div class="card-logo">
						<img src="img/logo/firebase.png" alt="logo-vuejs" class="h-10 p-1">
						<p>Firebase</p>
					</div>
					<div class="card-logo">
						<img src="img/logo/tailwindcss.png" alt="logo-vuejs" class="h-10 p-1">
						<p>TailwindCSS</p>
					</div>
				</div>
			</div>

			<!-- application description -->
			<div class="w-11/12 md:w-1/2 text-center my-12 leading-relaxed shadow-md pt-3 pb-8 px-3 md:px-8 rounded">
				<h1 class="text-2xl md:text-4xl mb-6">Kenapa Web App ini dibuat ?</h1>
				<h3 class="text-2xl md:text-3xl">Saxtile</h3>
				<h4 class="text-xl md:text-xl mb-6">Save Text & File</h4>
				<p class="tracking-wide mb-3">
					Saxtile adalah aplikasi web untuk menyimpan text/link dan file.
				</p>
				<p class="tracking-wide mb-3">
					Awal permasalahan dibuatnya aplikasi ini karena permasalahan pribadi, ketika saya menemukan sebuah link yang menarik dan ingin membuka link tersebut di laptop/pc, saya merasa kesulitan.
					sebelum dibuat aplikasi ini saya mengetikan keseluruhan link tersebut, dan itu sangat merepotkan. 
				</p>
				<p class="tracking-wide mb-3">
					Oleh karena itu saya membuat aplikasi ini untuk mempermudah mengelola text/link dan file, sehingga tidak perlu mengetikan ulang link tersebut lagi ketika ingin membukanya di laptop/pc
				</p>
				<p class="tracking-wide mb-3">
					Saxtile juga sudah mendukung Progressive Web App, sehingga anda dapat menginstall aplikasi saxtile di smartphone atau laptop anda, yang menjadikannya lebih mudah diakses. dan dapat dibuka secara offline.
				</p>
				<p>
					
				</p>
			</div>
		</div>
		<!-- footer -->
		<div class="w-full flex flex-col items-center justify-center h-24 text-gray-100">
			<h3>Saxtile</h3>
			<h4>Copyright &copy; 2020-2021 Huda Damar</h4>
		</div>
	</div>
</template>

<script>
export default {
	title: 'Saxtile',
	components: {
		Button: () => import('@/components/Button')
	}
}
</script>

<style lang="postcss">
	#home {
		font-family: 'Poppins', 'Arial', sans-serif;
	}
	.card-logo {
		@apply flex flex-col items-center shadow p-1 rounded
	}
</style>