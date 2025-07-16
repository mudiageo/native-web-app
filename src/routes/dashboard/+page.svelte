<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	
	// Mock data for dashboard widgets
	const stats = [
		{ label: 'Total Users', value: '12,847', change: '+12%', icon: '👥' },
		{ label: 'Revenue', value: '$34,521', change: '+8%', icon: '💰' },
		{ label: 'Orders', value: '1,423', change: '+15%', icon: '📦' },
		{ label: 'Growth', value: '23%', change: '+5%', icon: '📈' }
	];
	
	const activities = [
		{ time: '2 min ago', action: 'New user registered', icon: '👤' },
		{ time: '5 min ago', action: 'Order #1234 completed', icon: '✅' },
		{ time: '12 min ago', action: 'Payment received', icon: '💳' },
		{ time: '25 min ago', action: 'Product review submitted', icon: '⭐' },
		{ time: '1 hour ago', action: 'Support ticket resolved', icon: '🎫' }
	];
	
	const chartData = [65, 78, 66, 44, 56, 67, 75];
	
	async function handleRefresh() {
		// Simulate refreshing dashboard data
		await new Promise(resolve => setTimeout(resolve, 1200));
	}
</script>

<svelte:head>
	<title>Dashboard - Native Web App</title>
</svelte:head>

<div class="p-4 space-y-6 pb-20">
	<!-- Header -->
	<section class="text-center py-4">
		<h1 class="text-2xl font-bold mb-2">Dashboard</h1>
		<p class="text-muted-foreground">Overview of your app performance</p>
	</section>
	
	<!-- Stats Grid -->
	<section class="grid grid-cols-2 gap-4">
		{#each stats as stat}
			<Card class="p-4">
				<div class="flex items-center justify-between mb-2">
					<span class="text-2xl">{stat.icon}</span>
					<span class="text-xs text-green-600 font-medium">{stat.change}</span>
				</div>
				<div class="space-y-1">
					<p class="text-2xl font-bold">{stat.value}</p>
					<p class="text-xs text-muted-foreground">{stat.label}</p>
				</div>
			</Card>
		{/each}
	</section>
	
	<!-- Chart Widget -->
	<section>
		<Card class="p-4">
			<h3 class="font-semibold mb-4 flex items-center">
				<span class="mr-2">📊</span>
				Weekly Performance
			</h3>
			<div class="space-y-3">
				{#each chartData as value, i}
					<div class="flex items-center space-x-3">
						<span class="text-sm text-muted-foreground w-8">Day {i + 1}</span>
						<div class="flex-1">
							<Progress {value} class="h-2" />
						</div>
						<span class="text-sm font-medium w-8">{value}%</span>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Recent Activity -->
	<section>
		<Card class="p-4">
			<h3 class="font-semibold mb-4 flex items-center">
				<span class="mr-2">🕒</span>
				Recent Activity
			</h3>
			<div class="space-y-3">
				{#each activities as activity}
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
		<div class="grid grid-cols-3 gap-3">
			<button class="flex flex-col items-center p-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
				<span class="text-xl mb-1">📝</span>
				<span class="text-xs font-medium">New Post</span>
			</button>
			<button class="flex flex-col items-center p-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
				<span class="text-xl mb-1">📧</span>
				<span class="text-xs font-medium">Messages</span>
			</button>
			<button class="flex flex-col items-center p-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
				<span class="text-xl mb-1">🔍</span>
				<span class="text-xs font-medium">Analytics</span>
			</button>
		</div>
	</section>
</div>