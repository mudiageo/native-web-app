<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BottomNavigation from './BottomNavigation.svelte';
	import SideDrawer from './SideDrawer.svelte';
	import MobileHeader from './MobileHeader.svelte';
	import PullToRefresh from './PullToRefresh.svelte';
	import { Home, BarChart3, User, MessageCircle, Settings, Sparkles, Calendar, Map, Camera, Music, ShoppingCart, Search, Bell } from 'lucide-svelte';
	
	let { 
		children,
		title = 'Native Web App',
		showBottomNav = true,
		showHeader = true,
		onRefresh,
		headerActions = []
	}: {
		children?: any;
		title?: string;
		showBottomNav?: boolean;
		showHeader?: boolean;
		onRefresh?: () => Promise<void> | void;
		headerActions?: Array<{ icon: any; label: string; onClick: () => void }>;
	} = $props();
	
	let drawerOpen = $state(false);
	
	const navItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
		{ href: '/profile', label: 'Profile', icon: User },
		{ href: '/chat', label: 'Chat', icon: MessageCircle, badge: 3 },
		{ href: '/settings', label: 'Settings', icon: Settings }
	];
	
	const drawerItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
		{ href: '/profile', label: 'Profile', icon: User },
		{ href: '/chat', label: 'Chat', icon: MessageCircle },
		{ href: '/social', label: 'Social Feed', icon: Home, section: 'Social' },
		{ href: '/calendar', label: 'Calendar', icon: Calendar, section: 'Productivity' },
		{ href: '/maps', label: 'Maps', icon: Map, section: 'Productivity' },
		{ href: '/camera', label: 'Camera', icon: Camera, section: 'Media' },
		{ href: '/music', label: 'Music', icon: Music, section: 'Media' },
		{ href: '/shopping', label: 'Shopping', icon: ShoppingCart, section: 'Commerce' },
		{ href: '/glass', label: 'Glass UI', icon: Sparkles, section: 'Showcase' },
		{ href: '/search', label: 'Search', icon: Search, section: 'Tools' },
		{ href: '/notifications', label: 'Notifications', icon: Bell, section: 'Tools' },
		{ href: '/settings', label: 'Settings', icon: Settings, section: 'Account' }
	];
	
	function handleDrawerItemClick(item: any) {
		goto(item.href);
	}
	
	async function handleRefresh() {
		if (onRefresh) {
			await onRefresh();
		} else {
			// Default refresh behavior
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
	
	// Determine current page title
	const currentTitle = $derived(() => {
		const pathname = $page.url.pathname;
		const item = drawerItems.find(item => item.href === pathname);
		return item?.label || title;
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	<!-- Side Drawer -->
	<SideDrawer 
		bind:open={drawerOpen} 
		items={drawerItems}
		onItemClick={handleDrawerItemClick}
	/>
	
	<!-- Main Layout -->
	<div class="flex flex-col min-h-screen">
		<!-- Header -->
		{#if showHeader}
			<MobileHeader 
				title={currentTitle()}
				onMenuClick={() => drawerOpen = true}
				actions={headerActions}
			/>
		{/if}
		
		<!-- Main Content -->
		<main class="flex-1 overflow-hidden">
			{#if onRefresh}
				<PullToRefresh onRefresh={handleRefresh}>
					{@render children?.()}
				</PullToRefresh>
			{:else}
				{@render children?.()}
			{/if}
		</main>
		
		<!-- Bottom Navigation -->
		{#if showBottomNav}
			<BottomNavigation items={navItems} />
		{/if}
	</div>
</div>

<style>
	:global(body) {
		overscroll-behavior: none;
		touch-action: pan-x pan-y;
	}
	
	/* Safe area support for newer devices */
	:global(.safe-area-inset-top) {
		padding-top: env(safe-area-inset-top);
	}
	
	:global(.safe-area-inset-bottom) {
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	:global(.px-safe-area-inset-x) {
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
	}
</style>