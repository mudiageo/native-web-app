<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils.js';
	
	interface NavItem {
		href: string;
		label: string;
		icon: string;
		badge?: number;
	}
	
	let { items = [], class: className = '' }: { items: NavItem[]; class?: string } = $props();
	
	function isActive(href: string) {
		return $page.url.pathname === href || 
			($page.url.pathname.startsWith(href) && href !== '/');
	}
</script>

<nav class={cn(
	'fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border',
	'safe-area-inset-bottom px-safe-area-inset-x',
	className
)}>
	<div class="flex items-center justify-around h-16 px-4">
		{#each items as item}
			<button
				type="button"
				onclick={() => goto(item.href)}
				class={cn(
					'flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200',
					'hover:bg-accent active:scale-95',
					isActive(item.href) 
						? 'text-primary bg-primary/10' 
						: 'text-muted-foreground hover:text-foreground'
				)}
				aria-label={item.label}
			>
				<div class="relative">
					<span class="text-xl">{item.icon}</span>
					{#if item.badge}
						<span class="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-4 h-4 flex items-center justify-center px-1">
							{item.badge}
						</span>
					{/if}
				</div>
				<span class="text-xs font-medium">{item.label}</span>
			</button>
		{/each}
	</div>
</nav>