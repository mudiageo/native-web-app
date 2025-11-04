<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import { Users, DollarSign, Package, TrendingUp, UserPlus, CheckCircle, CreditCard, Star, Ticket, Edit, Mail, BarChart } from 'lucide-svelte';
	
	// Mock data for dashboard widgets
	const stats = [
		{ label: 'Total Users', value: '12,847', change: '+12%', icon: Users, gradient: 'from-blue-500 to-blue-600' },
		{ label: 'Revenue', value: '$34,521', change: '+8%', icon: DollarSign, gradient: 'from-green-500 to-green-600' },
		{ label: 'Orders', value: '1,423', change: '+15%', icon: Package, gradient: 'from-purple-500 to-purple-600' },
		{ label: 'Growth', value: '23%', change: '+5%', icon: TrendingUp, gradient: 'from-orange-500 to-orange-600' }
	];
	
	const activities = [
		{ time: '2 min ago', action: 'New user registered', icon: UserPlus, color: 'text-blue-500' },
		{ time: '5 min ago', action: 'Order #1234 completed', icon: CheckCircle, color: 'text-green-500' },
		{ time: '12 min ago', action: 'Payment received', icon: CreditCard, color: 'text-purple-500' },
		{ time: '25 min ago', action: 'Product review submitted', icon: Star, color: 'text-yellow-500' },
		{ time: '1 hour ago', action: 'Support ticket resolved', icon: Ticket, color: 'text-orange-500' }
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

<div class="p-6 space-y-6 pb-24">
	<!-- Header -->
	<section class="text-center py-4">
		<h1 class="text-3xl font-bold mb-2">Dashboard</h1>
		<p class="text-muted-foreground">Overview of your app performance</p>
	</section>
	
	<!-- Stats Grid -->
	<section class="grid grid-cols-2 gap-4">
		{#each stats as stat}
			<Card class="p-4 border-border/50 hover:border-primary/30 transition-all duration-200">
				<div class="flex items-center justify-between mb-3">
					<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br {stat.gradient} text-white shadow-md">
						<svelte:component this={stat.icon} class="w-5 h-5" />
					</div>
					<span class="text-xs font-semibold px-2 py-1 bg-green-500/10 text-green-600 rounded-full">{stat.change}</span>
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
		<Card class="p-5 border-border/50">
			<h3 class="font-semibold mb-4 flex items-center text-base">
				<div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary mr-3">
					<BarChart class="w-4 h-4" />
				</div>
				Weekly Performance
			</h3>
			<div class="space-y-3">
				{#each chartData as value, i}
					<div class="flex items-center space-x-3">
						<span class="text-sm text-muted-foreground font-medium w-12">Day {i + 1}</span>
						<div class="flex-1">
							<Progress {value} class="h-2.5" />
						</div>
						<span class="text-sm font-semibold w-10 text-right">{value}%</span>
					</div>
				{/each}
			</div>
		</Card>
	</section>
	
	<!-- Recent Activity -->
	<section>
		<Card class="p-5 border-border/50">
			<h3 class="font-semibold mb-4 flex items-center text-base">
				<div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary mr-3">
					<Star class="w-4 h-4" />
				</div>
				Recent Activity
			</h3>
			<div class="space-y-1">
				{#each activities as activity}
					<div class="flex items-start space-x-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-200 cursor-pointer">
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
		<div class="grid grid-cols-3 gap-3">
			<button class="flex flex-col items-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-200 shadow-sm">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 mb-2">
					<Edit class="w-5 h-5" />
				</div>
				<span class="text-xs font-semibold">New Post</span>
			</button>
			<button class="flex flex-col items-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-200 shadow-sm">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 mb-2">
					<Mail class="w-5 h-5" />
				</div>
				<span class="text-xs font-semibold">Messages</span>
			</button>
			<button class="flex flex-col items-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-xl hover:from-primary/20 hover:to-primary/10 transition-all duration-200 shadow-sm">
				<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 mb-2">
					<BarChart class="w-5 h-5" />
				</div>
				<span class="text-xs font-semibold">Analytics</span>
			</button>
		</div>
	</section>
</div>