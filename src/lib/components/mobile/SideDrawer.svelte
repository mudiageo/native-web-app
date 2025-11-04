<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { X } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	
	interface DrawerItem {
		href: string;
		label: string;
		icon: ComponentType;
		section?: string;
	}
	
	let { 
		open = $bindable(false), 
		items = [], 
		class: className = '',
		onItemClick
	}: { 
		open: boolean; 
		items: DrawerItem[]; 
		class?: string;
		onItemClick?: (item: DrawerItem) => void;
	} = $props();
	
	let drawerRef: HTMLElement;
	let startX = 0;
	let currentX = 0;
	let isDragging = false;
	
	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
		isDragging = true;
	}
	
	function handleTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		currentX = e.touches[0].clientX;
		const deltaX = currentX - startX;
		
		if (open && deltaX < -50) {
			// Swiping left to close
			const translateX = Math.max(deltaX, -300);
			drawerRef.style.transform = `translateX(${translateX}px)`;
		} else if (!open && deltaX > 50) {
			// Swiping right to open
			const translateX = Math.min(deltaX - window.innerWidth, 0);
			drawerRef.style.transform = `translateX(${translateX}px)`;
		}
	}
	
	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;
		
		const deltaX = currentX - startX;
		if (open && deltaX < -100) {
			open = false;
		} else if (!open && deltaX > 100) {
			open = true;
		}
		
		drawerRef.style.transform = '';
	}
	
	function handleItemClick(item: DrawerItem) {
		onItemClick?.(item);
		open = false;
	}
	
	// Group items by section
	const groupedItems = $derived(() => {
		const grouped: Record<string, DrawerItem[]> = {};
		items.forEach(item => {
			const section = item.section || 'main';
			if (!grouped[section]) grouped[section] = [];
			grouped[section].push(item);
		});
		return grouped;
	});
	
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape' && open) {
				open = false;
			}
		}
		
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<!-- Backdrop -->
{#if open}
	<div 
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
		onclick={() => open = false}
		onkeydown={(e) => e.key === 'Enter' && (open = false)}
		role="button"
		tabindex="-1"
		aria-label="Close drawer"
	></div>
{/if}

<!-- Drawer -->
<aside
	bind:this={drawerRef}
	class={cn(
		'fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background border-r border-border/50 z-50 shadow-2xl',
		'transform transition-transform duration-300 ease-out',
		open ? 'translate-x-0' : '-translate-x-full',
		className
	)}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	role="navigation"
	aria-label="Navigation drawer"
>
	<div class="flex flex-col h-full">
		<!-- Header -->
		<header class="flex items-center justify-between p-5 border-b border-border/50">
			<h2 class="text-lg font-semibold">Navigation</h2>
			<button
				type="button"
				onclick={() => open = false}
				class="p-2 rounded-xl hover:bg-accent transition-colors"
				aria-label="Close drawer"
			>
				<X class="w-5 h-5" />
			</button>
		</header>
		
		<!-- Content -->
		<div class="flex-1 overflow-y-auto p-4">
			{#each Object.entries(groupedItems) as [section, sectionItems]}
				{#if section !== 'main'}
					<h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-6 first:mt-0 px-1">
						{section}
					</h3>
				{/if}
				
				<nav class="space-y-1">
					{#each sectionItems as item}
						<button
							type="button"
							onclick={() => handleItemClick(item)}
							class="flex items-center space-x-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-all duration-200 text-left group"
						>
							<svelte:component this={item.icon} class="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
							<span class="font-medium">{item.label}</span>
						</button>
					{/each}
				</nav>
			{/each}
		</div>
		
		<!-- Footer -->
		<footer class="p-4 border-t border-border/50">
			<div class="text-xs text-muted-foreground">
				Native Web App v1.0
			</div>
		</footer>
	</div>
</aside>