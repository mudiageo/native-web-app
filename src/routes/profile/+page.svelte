<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	
	// Mock user data
	const user = {
		name: 'Alex Johnson',
		email: 'alex.johnson@example.com',
		phone: '+1 (555) 123-4567',
		location: 'San Francisco, CA',
		bio: 'Full-stack developer passionate about creating amazing user experiences with modern web technologies.',
		avatar: '👤',
		stats: {
			projects: 42,
			connections: 1337,
			achievements: 28
		},
		badges: ['🥇 Top Contributor', '🚀 Early Adopter', '💡 Innovator'],
		recentActivity: [
			{ action: 'Completed project "E-commerce Dashboard"', time: '2 hours ago', icon: '✅' },
			{ action: 'Updated profile information', time: '1 day ago', icon: '✏️' },
			{ action: 'Connected with Sarah Chen', time: '2 days ago', icon: '👥' },
			{ action: 'Earned "Problem Solver" badge', time: '1 week ago', icon: '🏆' }
		]
	};
	
	let isEditing = $state(false);
	let editedBio = $state(user.bio);
	
	function handleSave() {
		user.bio = editedBio;
		isEditing = false;
	}
</script>

<svelte:head>
	<title>Profile - Native Web App</title>
</svelte:head>

<div class="p-4 space-y-6 pb-20">
	<!-- Profile Header -->
	<section>
		<Card class="p-6">
			<div class="flex items-center space-x-4 mb-4">
				<div class="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl">
					{user.avatar}
				</div>
				<div class="flex-1">
					<h1 class="text-xl font-bold">{user.name}</h1>
					<p class="text-muted-foreground">{user.email}</p>
					<p class="text-sm text-muted-foreground">{user.location}</p>
				</div>
				<Button variant="outline" size="sm">
					<span class="mr-2">✏️</span>
					Edit
				</Button>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-3 gap-4 mb-4">
				<div class="text-center">
					<p class="text-lg font-bold">{user.stats.projects}</p>
					<p class="text-xs text-muted-foreground">Projects</p>
				</div>
				<div class="text-center">
					<p class="text-lg font-bold">{user.stats.connections}</p>
					<p class="text-xs text-muted-foreground">Connections</p>
				</div>
				<div class="text-center">
					<p class="text-lg font-bold">{user.stats.achievements}</p>
					<p class="text-xs text-muted-foreground">Achievements</p>
				</div>
			</div>
			
			<Separator class="my-4" />
			
			<!-- Bio Section -->
			<div>
				<div class="flex items-center justify-between mb-2">
					<h3 class="font-semibold">About</h3>
					<button
						onclick={() => isEditing = !isEditing}
						class="text-xs text-primary hover:underline"
					>
						{isEditing ? 'Cancel' : 'Edit'}
					</button>
				</div>
				
				{#if isEditing}
					<div class="space-y-2">
						<textarea
							bind:value={editedBio}
							class="w-full p-2 border border-border rounded-lg resize-none"
							rows="3"
						></textarea>
						<div class="flex space-x-2">
							<Button size="sm" onclick={handleSave}>Save</Button>
							<Button variant="outline" size="sm" onclick={() => isEditing = false}>
								Cancel
							</Button>
						</div>
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">{user.bio}</p>
				{/if}
			</div>
		</Card>
	</section>
	
	<!-- Contact Information -->
	<section>
		<Card class="p-4">
			<h3 class="font-semibold mb-4">Contact Information</h3>
			<div class="space-y-3">
				<div class="flex items-center space-x-3">
					<span class="text-lg">📧</span>
					<div>
						<p class="text-sm font-medium">Email</p>
						<p class="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>
				<div class="flex items-center space-x-3">
					<span class="text-lg">📱</span>
					<div>
						<p class="text-sm font-medium">Phone</p>
						<p class="text-sm text-muted-foreground">{user.phone}</p>
					</div>
				</div>
				<div class="flex items-center space-x-3">
					<span class="text-lg">📍</span>
					<div>
						<p class="text-sm font-medium">Location</p>
						<p class="text-sm text-muted-foreground">{user.location}</p>
					</div>
				</div>
			</div>
		</Card>
	</section>
	
	<!-- Badges -->
	<section>
		<Card class="p-4">
			<h3 class="font-semibold mb-4">Badges & Achievements</h3>
			<div class="grid grid-cols-1 gap-2">
				{#each user.badges as badge}
					<div class="p-3 bg-primary/5 border border-primary/20 rounded-lg">
						<span class="text-sm font-medium">{badge}</span>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Recent Activity -->
	<section>
		<Card class="p-4">
			<h3 class="font-semibold mb-4">Recent Activity</h3>
			<div class="space-y-3">
				{#each user.recentActivity as activity}
					<div class="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
						<span class="text-lg">{activity.icon}</span>
						<div class="flex-1 min-w-0">
							<p class="text-sm">{activity.action}</p>
							<p class="text-xs text-muted-foreground">{activity.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Quick Actions -->
	<section>
		<h3 class="font-semibold mb-4">Quick Actions</h3>
		<div class="grid grid-cols-2 gap-3">
			<Button variant="outline" class="flex flex-col items-center p-4 h-auto">
				<span class="text-xl mb-1">🔐</span>
				<span class="text-xs">Security</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-4 h-auto">
				<span class="text-xl mb-1">🔔</span>
				<span class="text-xs">Notifications</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-4 h-auto">
				<span class="text-xl mb-1">📊</span>
				<span class="text-xs">Analytics</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-4 h-auto">
				<span class="text-xl mb-1">⚙️</span>
				<span class="text-xs">Settings</span>
			</Button>
		</div>
	</section>
</div>