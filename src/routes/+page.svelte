<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	
	async function handleRefresh() {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
	}
</script>

<svelte:head>
	<title>Home - Native Web App</title>
	<meta name="description" content="A comprehensive native-like web application" />
</svelte:head>

<div class="p-4 space-y-6 pb-20">
	<!-- Welcome Section -->
	<section class="text-center py-8">
		<h1 class="text-3xl font-bold mb-2">Welcome to Native Web App</h1>
		<p class="text-muted-foreground mb-6">
			Experience native mobile features in your web browser
		</p>
		<div class="inline-flex px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
			✨ Pull down to refresh
		</div>
	</section>
	
	<!-- Feature Cards -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Features</h2>
		
		<div class="grid gap-4">
			<Card class="p-4">
				<div class="flex items-center space-x-3">
					<span class="text-2xl">📱</span>
					<div>
						<h3 class="font-medium">Mobile-First Design</h3>
						<p class="text-sm text-muted-foreground">Optimized for touch interactions</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-4">
				<div class="flex items-center space-x-3">
					<span class="text-2xl">👆</span>
					<div>
						<h3 class="font-medium">Swipe Gestures</h3>
						<p class="text-sm text-muted-foreground">Navigate with natural gestures</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-4">
				<div class="flex items-center space-x-3">
					<span class="text-2xl">🔄</span>
					<div>
						<h3 class="font-medium">Pull to Refresh</h3>
						<p class="text-sm text-muted-foreground">Native refresh behavior</p>
					</div>
				</div>
			</Card>
			
			<Card class="p-4">
				<div class="flex items-center space-x-3">
					<span class="text-2xl">✨</span>
					<div>
						<h3 class="font-medium">Glass Morphism</h3>
						<p class="text-sm text-muted-foreground">Modern glass effects</p>
					</div>
				</div>
			</Card>
		</div>
	</section>
	
	<!-- Quick Actions -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Quick Actions</h2>
		
		<div class="grid grid-cols-2 gap-4">
			<a href="/dashboard" class="block">
				<Card class="p-4 text-center hover:bg-accent transition-colors">
					<span class="text-2xl block mb-2">📊</span>
					<span class="text-sm font-medium">Dashboard</span>
				</Card>
			</a>
			
			<a href="/profile" class="block">
				<Card class="p-4 text-center hover:bg-accent transition-colors">
					<span class="text-2xl block mb-2">👤</span>
					<span class="text-sm font-medium">Profile</span>
				</Card>
			</a>
			
			<a href="/chat" class="block">
				<Card class="p-4 text-center hover:bg-accent transition-colors">
					<span class="text-2xl block mb-2">💬</span>
					<span class="text-sm font-medium">Chat</span>
				</Card>
			</a>
			
			<a href="/glass" class="block">
				<Card class="p-4 text-center hover:bg-accent transition-colors">
					<span class="text-2xl block mb-2">✨</span>
					<span class="text-sm font-medium">Glass UI</span>
				</Card>
			</a>
		</div>
	</section>
</div>
