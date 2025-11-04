<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	
	// Glass morphism CSS classes
	const glassClasses = {
		light: 'bg-white/10 backdrop-blur-md border border-white/20',
		medium: 'bg-white/20 backdrop-blur-lg border border-white/30',
		heavy: 'bg-white/30 backdrop-blur-xl border border-white/40',
		dark: 'bg-black/20 backdrop-blur-md border border-white/10'
	};
	
	let selectedEffect: 'light' | 'medium' | 'heavy' | 'dark' = $state('medium');
	let isDarkMode = $state(false);
	
	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle('dark', isDarkMode);
	}
</script>

<svelte:head>
	<title>Glass Morphism - Native Web App</title>
</svelte:head>

<!-- Background with gradient and shapes -->
<div class="min-h-screen relative overflow-hidden" 
	 style="background: {isDarkMode 
		? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)' 
		: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'}">
	
	<!-- Animated background shapes -->
	<div class="absolute inset-0">
		<div class="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
		<div class="absolute top-40 right-10 w-24 h-24 bg-pink-300/30 rounded-full blur-lg animate-bounce" style="animation-delay: 1s;"></div>
		<div class="absolute bottom-32 left-20 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-20 right-20 w-28 h-28 bg-purple-300/25 rounded-full blur-xl animate-bounce" style="animation-delay: 3s;"></div>
	</div>
	
	<!-- Content -->
	<div class="relative z-10 p-4 space-y-6 pb-20">
		<!-- Header -->
		<section class="text-center py-8">
			<div class="glass-card {glassClasses[selectedEffect]} p-6 rounded-2xl">
				<h1 class="text-3xl font-bold text-white mb-2">Glass Morphism</h1>
				<p class="text-white/80">
					Modern frosted glass effects with backdrop blur
				</p>
			</div>
		</section>
		
		<!-- Controls -->
		<section>
			<div class="glass-card {glassClasses.medium} p-4 rounded-xl">
				<h2 class="text-lg font-semibold text-white mb-4">Controls</h2>
				
				<div class="space-y-4">
					<!-- Effect Selector -->
					<div>
						<label class="block text-sm font-medium text-white/90 mb-2">Glass Effect</label>
						<div class="grid grid-cols-2 gap-2">
							{#each Object.keys(glassClasses) as effect}
								<button
									onclick={() => selectedEffect = effect as typeof selectedEffect}
									class="p-2 rounded-lg border text-sm font-medium transition-all
										{selectedEffect === effect 
											? 'bg-white/30 border-white/50 text-white' 
											: 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'}"
								>
									{effect.charAt(0).toUpperCase() + effect.slice(1)}
								</button>
							{/each}
						</div>
					</div>
					
					<!-- Dark Mode Toggle -->
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium text-white/90">Dark Mode</span>
						<button
							onclick={toggleDarkMode}
							class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors
								{isDarkMode ? 'bg-white/30' : 'bg-white/20'}"
							aria-label="Toggle dark mode"
						>
							<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform
								{isDarkMode ? 'translate-x-6' : 'translate-x-1'}">
							</span>
						</button>
					</div>
				</div>
			</div>
		</section>
		
		<!-- Glass Cards Examples -->
		<section class="space-y-4">
			<h2 class="text-lg font-semibold text-white">Interactive Examples</h2>
			
			<!-- Profile Card -->
			<div class="glass-card {glassClasses[selectedEffect]} p-6 rounded-xl">
				<div class="flex items-center space-x-4 mb-4">
					<div class="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center">
						<span class="text-xl">👤</span>
					</div>
					<div>
						<h3 class="font-semibold text-white">John Doe</h3>
						<p class="text-sm text-white/70">UI/UX Designer</p>
					</div>
				</div>
				<div class="grid grid-cols-3 gap-4 text-center">
					<div>
						<p class="text-lg font-bold text-white">128</p>
						<p class="text-xs text-white/70">Projects</p>
					</div>
					<div>
						<p class="text-lg font-bold text-white">2.5k</p>
						<p class="text-xs text-white/70">Followers</p>
					</div>
					<div>
						<p class="text-lg font-bold text-white">4.8</p>
						<p class="text-xs text-white/70">Rating</p>
					</div>
				</div>
			</div>
			
			<!-- Music Player -->
			<div class="glass-card {glassClasses[selectedEffect]} p-6 rounded-xl">
				<div class="flex items-center space-x-4 mb-4">
					<div class="w-12 h-12 bg-gradient-to-br from-purple-400/50 to-pink-400/50 rounded-lg flex items-center justify-center">
						<span class="text-xl">🎵</span>
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-white">Midnight Dreams</h3>
						<p class="text-sm text-white/70">Synthwave Artist</p>
					</div>
				</div>
				<div class="space-y-3">
					<div class="h-1 bg-white/20 rounded-full overflow-hidden">
						<div class="h-full w-1/3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
					</div>
					<div class="flex items-center justify-center space-x-6">
						<button class="p-2 text-white/70 hover:text-white transition-colors">⏮️</button>
						<button class="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">▶️</button>
						<button class="p-2 text-white/70 hover:text-white transition-colors">⏭️</button>
					</div>
				</div>
			</div>
			
			<!-- Weather Widget -->
			<div class="glass-card {glassClasses[selectedEffect]} p-6 rounded-xl">
				<div class="flex items-center justify-between mb-4">
					<div>
						<h3 class="font-semibold text-white">New York</h3>
						<p class="text-sm text-white/70">Partly Cloudy</p>
					</div>
					<span class="text-3xl">⛅</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-white">72°F</span>
					<div class="text-right text-sm text-white/70">
						<p>High: 78°F</p>
						<p>Low: 65°F</p>
					</div>
				</div>
			</div>
			
			<!-- Action Buttons -->
			<div class="grid grid-cols-2 gap-4">
				<button class="glass-card {glassClasses[selectedEffect]} p-4 rounded-xl text-center hover:bg-white/10 transition-all active:scale-95">
					<span class="text-2xl block mb-2">💌</span>
					<span class="text-sm font-medium text-white">Messages</span>
				</button>
				<button class="glass-card {glassClasses[selectedEffect]} p-4 rounded-xl text-center hover:bg-white/10 transition-all active:scale-95">
					<span class="text-2xl block mb-2">📸</span>
					<span class="text-sm font-medium text-white">Camera</span>
				</button>
			</div>
		</section>
		
		<!-- Code Examples -->
		<section>
			<div class="glass-card {glassClasses.medium} p-4 rounded-xl">
				<h2 class="text-lg font-semibold text-white mb-4">CSS Code</h2>
				<div class="bg-black/30 p-3 rounded-lg text-sm font-mono text-white/90 overflow-x-auto">
					<pre>{`.glass-${selectedEffect} {
  background: rgba(255, 255, 255, ${selectedEffect === 'light' ? '0.1' : selectedEffect === 'medium' ? '0.2' : selectedEffect === 'heavy' ? '0.3' : '0.1'});
  backdrop-filter: blur(${selectedEffect === 'light' ? '12px' : selectedEffect === 'medium' ? '16px' : selectedEffect === 'heavy' ? '20px' : '12px'});
  border: 1px solid rgba(255, 255, 255, ${selectedEffect === 'light' ? '0.2' : selectedEffect === 'medium' ? '0.3' : selectedEffect === 'heavy' ? '0.4' : '0.1'});
  border-radius: 12px;
}`}</pre>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.glass-card {
		transition: all 0.3s ease;
	}
	
	.glass-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}
	
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
</style>