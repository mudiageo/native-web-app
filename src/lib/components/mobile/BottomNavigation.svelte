<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils.js';
	import type { ComponentType } from 'svelte';
	
	interface NavItem {
		href: string;
		label: string;
		icon: ComponentType;
		badge?: number;
	}
	
	let { items = [], class: className = '' }: { items: NavItem[]; class?: string } = $props();
	
	function isActive(href: string) {
		return $page.url.pathname === href || 
			($page.url.pathname.startsWith(href) && href !== '/');
	}
</script>

<nav class={cn(
	'fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50',
	'safe-area-inset-bottom px-safe-area-inset-x shadow-lg',
	className
)}>
	<div class="flex items-center justify-around h-16 px-2">
		{#each items as item}
			<button
				type="button"
				onclick={() => goto(item.href)}
				class={cn(
					'flex flex-col items-center justify-center space-y-1 p-2 rounded-xl transition-all duration-200 min-w-[64px]',
					'hover:bg-accent/50 active:scale-95',
					isActive(item.href) 
						? 'text-primary' 
						: 'text-muted-foreground hover:text-foreground'
				)}
				aria-label={item.label}
			>
				<div class="relative">
					<svelte:component this={item.icon} class="w-6 h-6" />
					{#if item.badge}
						<span class="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] rounded-full min-w-5 h-5 flex items-center justify-center px-1 font-semibold shadow-sm">
							{item.badge}
						</span>
					{/if}
				</div>
				<span class="text-[11px] font-medium">{item.label}</span>
			</button>
		{/each}
	</div>
</nav>