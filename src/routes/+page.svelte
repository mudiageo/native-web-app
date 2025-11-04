<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Smartphone, Hand, RefreshCw, Sparkles, BarChart3, User, MessageCircle, Palette } from 'lucide-svelte';
	
	async function handleRefresh() {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
	}
</script>

<svelte:head>
	<title>Home - Native Web App</title>
	<meta name="description" content="A comprehensive native-like web application" />
</svelte:head>

<div class="p-6 space-y-8 pb-24">
	<!-- Welcome Section -->
	<section class="text-center py-12">
		<div class="mb-4">
			<div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground mb-4 shadow-lg">
				<Sparkles class="w-8 h-8" />
			</div>
		</div>
		<h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
			Native Web App
		</h1>
		<p class="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
			Experience native mobile features in your web browser
		</p>
		<div class="inline-flex items-center px-4 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
			<RefreshCw class="w-4 h-4 mr-2" />
			Pull down to refresh
		</div>
	</section>
	
	<!-- Feature Cards -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold px-1">Features</h2>
		
		<div class="grid gap-4">
			<Card class="p-5 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
				<div class="flex items-center space-x-4">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
						<Smartphone class="w-6 h-6" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-base mb-1">Mobile-First Design</h3>
						<p class="text-sm text-muted-foreground">Optimized for touch interactions</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-5 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
				<div class="flex items-center space-x-4">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
						<Hand class="w-6 h-6" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-base mb-1">Swipe Gestures</h3>
						<p class="text-sm text-muted-foreground">Navigate with natural gestures</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-5 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
				<div class="flex items-center space-x-4">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
						<RefreshCw class="w-6 h-6" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-base mb-1">Pull to Refresh</h3>
						<p class="text-sm text-muted-foreground">Native refresh behavior</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-5 border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-lg">
				<div class="flex items-center space-x-4">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md">
						<Sparkles class="w-6 h-6" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold text-base mb-1">Glass Morphism</h3>
						<p class="text-sm text-muted-foreground">Modern glass effects</p>
					</div>
				</div>
			</Card>
		</div>
	</section>
	
	<!-- Quick Actions -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold px-1">Quick Actions</h2>
		
		<div class="grid grid-cols-2 gap-4">
			<a href="/dashboard" class="block">
				<Card class="p-6 text-center hover:bg-accent/50 transition-all duration-200 border-border/50 hover:border-primary/30 hover:shadow-lg">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white mx-auto mb-3 shadow-md">
						<BarChart3 class="w-6 h-6" />
					</div>
					<span class="text-sm font-semibold">Dashboard</span>
				</Card>
			</a>
			
			<a href="/profile" class="block">
				<Card class="p-6 text-center hover:bg-accent/50 transition-all duration-200 border-border/50 hover:border-primary/30 hover:shadow-lg">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white mx-auto mb-3 shadow-md">
						<User class="w-6 h-6" />
					</div>
					<span class="text-sm font-semibold">Profile</span>
				</Card>
			</a>
			
			<a href="/chat" class="block">
				<Card class="p-6 text-center hover:bg-accent/50 transition-all duration-200 border-border/50 hover:border-primary/30 hover:shadow-lg">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mx-auto mb-3 shadow-md">
						<MessageCircle class="w-6 h-6" />
					</div>
					<span class="text-sm font-semibold">Chat</span>
				</Card>
			</a>
			
			<a href="/glass" class="block">
				<Card class="p-6 text-center hover:bg-accent/50 transition-all duration-200 border-border/50 hover:border-primary/30 hover:shadow-lg">
					<div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white mx-auto mb-3 shadow-md">
						<Palette class="w-6 h-6" />
					</div>
					<span class="text-sm font-semibold">Glass UI</span>
				</Card>
			</a>
		</div>
	</section>
</div>
