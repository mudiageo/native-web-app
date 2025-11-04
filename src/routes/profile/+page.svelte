<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { User, Edit, Mail, Phone, MapPin, Award, CheckCircle, Users, Trophy, Shield, Bell, BarChart, Settings } from 'lucide-svelte';
	
	// Mock user data
	const user = {
		name: 'Alex Johnson',
		email: 'alex.johnson@example.com',
		phone: '+1 (555) 123-4567',
		location: 'San Francisco, CA',
		bio: 'Full-stack developer passionate about creating amazing user experiences with modern web technologies.',
		avatar: User,
		stats: {
			projects: 42,
			connections: 1337,
			achievements: 28
		},
		badges: [
			{ text: 'Top Contributor', icon: Award },
			{ text: 'Early Adopter', icon: Trophy },
			{ text: 'Innovator', icon: Trophy }
		],
		recentActivity: [
			{ action: 'Completed project "E-commerce Dashboard"', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
			{ action: 'Updated profile information', time: '1 day ago', icon: Edit, color: 'text-blue-500' },
			{ action: 'Connected with Sarah Chen', time: '2 days ago', icon: Users, color: 'text-purple-500' },
			{ action: 'Earned "Problem Solver" badge', time: '1 week ago', icon: Trophy, color: 'text-yellow-500' }
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

<div class="p-6 space-y-6 pb-24">
	<!-- Profile Header -->
	<section>
		<Card class="p-6 border-border/50">
			<div class="flex items-center space-x-4 mb-5">
				<div class="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-white shadow-lg">
					<User class="w-10 h-10" />
				</div>
				<div class="flex-1 min-w-0">
					<h1 class="text-2xl font-bold mb-1">{user.name}</h1>
					<p class="text-sm text-muted-foreground truncate">{user.email}</p>
					<p class="text-xs text-muted-foreground">{user.location}</p>
				</div>
				<Button variant="outline" size="sm" class="rounded-xl">
					<Edit class="w-4 h-4 mr-2" />
					Edit
				</Button>
			</div>
			
			<!-- Stats -->
			<div class="grid grid-cols-3 gap-4 mb-5">
				<div class="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5">
					<p class="text-2xl font-bold">{user.stats.projects}</p>
					<p class="text-xs text-muted-foreground font-medium">Projects</p>
				</div>
				<div class="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5">
					<p class="text-2xl font-bold">{user.stats.connections}</p>
					<p class="text-xs text-muted-foreground font-medium">Connections</p>
				</div>
				<div class="text-center p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5">
					<p class="text-2xl font-bold">{user.stats.achievements}</p>
					<p class="text-xs text-muted-foreground font-medium">Achievements</p>
				</div>
			</div>
			
			<Separator class="my-5" />
			
			<!-- Bio Section -->
			<div>
				<div class="flex items-center justify-between mb-3">
					<h3 class="font-semibold text-base">About</h3>
					<button
						onclick={() => isEditing = !isEditing}
						class="text-sm text-primary hover:underline font-medium"
					>
						{isEditing ? 'Cancel' : 'Edit'}
					</button>
				</div>
				
				{#if isEditing}
					<div class="space-y-3">
						<textarea
							bind:value={editedBio}
							class="w-full p-3 border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
							rows="3"
						></textarea>
						<div class="flex space-x-2">
							<Button size="sm" onclick={handleSave} class="rounded-xl">Save</Button>
							<Button variant="outline" size="sm" onclick={() => isEditing = false} class="rounded-xl">
								Cancel
							</Button>
						</div>
					</div>
				{:else}
					<p class="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
				{/if}
			</div>
		</Card>
	</section>
	
	<!-- Contact Information -->
	<section>
		<Card class="p-5 border-border/50">
			<h3 class="font-semibold mb-4 text-base">Contact Information</h3>
			<div class="space-y-3">
				<div class="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent/50 transition-all">
					<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
						<Mail class="w-5 h-5" />
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold">Email</p>
						<p class="text-sm text-muted-foreground truncate">{user.email}</p>
					</div>
				</div>
				<div class="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent/50 transition-all">
					<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10 text-green-500">
						<Phone class="w-5 h-5" />
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold">Phone</p>
						<p class="text-sm text-muted-foreground">{user.phone}</p>
					</div>
				</div>
				<div class="flex items-center space-x-3 p-3 rounded-xl hover:bg-accent/50 transition-all">
					<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500">
						<MapPin class="w-5 h-5" />
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-semibold">Location</p>
						<p class="text-sm text-muted-foreground">{user.location}</p>
					</div>
				</div>
			</div>
		</Card>
	</section>
	
	<!-- Badges -->
	<section>
		<Card class="p-5 border-border/50">
			<h3 class="font-semibold mb-4 text-base">Badges & Achievements</h3>
			<div class="grid grid-cols-1 gap-3">
				{#each user.badges as badge}
					<div class="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
						<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 text-primary">
							<svelte:component this={badge.icon} class="w-5 h-5" />
						</div>
						<span class="text-sm font-semibold">{badge.text}</span>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Recent Activity -->
	<section>
		<Card class="p-5 border-border/50">
			<h3 class="font-semibold mb-4 text-base">Recent Activity</h3>
			<div class="space-y-2">
				{#each user.recentActivity as activity}
					<div class="flex items-start space-x-3 p-3 rounded-xl hover:bg-accent/50 transition-all cursor-pointer">
						<div class="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/50 {activity.color}">
							<svelte:component this={activity.icon} class="w-4 h-4" />
						</div>
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium">{activity.action}</p>
							<p class="text-xs text-muted-foreground">{activity.time}</p>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Quick Actions -->
	<section>
		<h3 class="font-semibold mb-4 text-base px-1">Quick Actions</h3>
		<div class="grid grid-cols-2 gap-3">
			<Button variant="outline" class="flex flex-col items-center p-5 h-auto rounded-xl border-border/50 hover:border-primary/30">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-2">
					<Shield class="w-5 h-5" />
				</div>
				<span class="text-sm font-semibold">Security</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-5 h-auto rounded-xl border-border/50 hover:border-primary/30">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-2">
					<Bell class="w-5 h-5" />
				</div>
				<span class="text-sm font-semibold">Notifications</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-5 h-auto rounded-xl border-border/50 hover:border-primary/30">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-2">
					<BarChart class="w-5 h-5" />
				</div>
				<span class="text-sm font-semibold">Analytics</span>
			</Button>
			<Button variant="outline" class="flex flex-col items-center p-5 h-auto rounded-xl border-border/50 hover:border-primary/30">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-2">
					<Settings class="w-5 h-5" />
				</div>
				<span class="text-sm font-semibold">Settings</span>
			</Button>
		</div>
	</section>
</div>