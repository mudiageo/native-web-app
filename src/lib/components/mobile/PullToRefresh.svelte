<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	
	let { 
		onRefresh, 
		threshold = 80,
		class: className = '',
		children
	}: { 
		onRefresh: () => Promise<void> | void;
		threshold?: number;
		class?: string;
		children?: any;
	} = $props();
	
	let containerRef: HTMLElement;
	let refreshIndicatorRef: HTMLElement;
	let startY = 0;
	let currentY = 0;
	let pullDistance = $state(0);
	let isRefreshing = $state(false);
	let isPulling = $state(false);
	
	const maxPullDistance = threshold * 1.5;
	
	function handleTouchStart(e: TouchEvent) {
		if (containerRef.scrollTop === 0) {
			startY = e.touches[0].clientY;
			isPulling = true;
		}
	}
	
	function handleTouchMove(e: TouchEvent) {
		if (!isPulling || isRefreshing) return;
		
		currentY = e.touches[0].clientY;
		pullDistance = Math.max(0, Math.min(currentY - startY, maxPullDistance));
		
		if (pullDistance > 0) {
			e.preventDefault();
			updateIndicator();
		}
	}
	
	function handleTouchEnd() {
		if (!isPulling) return;
		isPulling = false;
		
		if (pullDistance >= threshold && !isRefreshing) {
			triggerRefresh();
		} else {
			resetIndicator();
		}
	}
	
	function updateIndicator() {
		const progress = Math.min(pullDistance / threshold, 1);
		const rotation = progress * 180;
		const opacity = Math.min(progress, 1);
		
		if (refreshIndicatorRef) {
			refreshIndicatorRef.style.transform = `translateY(${pullDistance}px) rotate(${rotation}deg)`;
			refreshIndicatorRef.style.opacity = opacity.toString();
		}
		
		containerRef.style.transform = `translateY(${pullDistance}px)`;
	}
	
	async function triggerRefresh() {
		isRefreshing = true;
		
		if (refreshIndicatorRef) {
			refreshIndicatorRef.style.transform = `translateY(${threshold}px) rotate(360deg)`;
			refreshIndicatorRef.style.opacity = '1';
		}
		
		containerRef.style.transform = `translateY(${threshold}px)`;
		
		try {
			await onRefresh();
		} finally {
			setTimeout(() => {
				isRefreshing = false;
				resetIndicator();
			}, 500);
		}
	}
	
	function resetIndicator() {
		pullDistance = 0;
		
		if (refreshIndicatorRef) {
			refreshIndicatorRef.style.transform = 'translateY(0) rotate(0deg)';
			refreshIndicatorRef.style.opacity = '0';
		}
		
		containerRef.style.transform = 'translateY(0)';
	}
	
	onMount(() => {
		const container = containerRef;
		if (!container) return;
		
		container.addEventListener('touchstart', handleTouchStart, { passive: false });
		container.addEventListener('touchmove', handleTouchMove, { passive: false });
		container.addEventListener('touchend', handleTouchEnd);
		
		return () => {
			container.removeEventListener('touchstart', handleTouchStart);
			container.removeEventListener('touchmove', handleTouchMove);
			container.removeEventListener('touchend', handleTouchEnd);
		};
	});
</script>

<div class={cn('relative h-full overflow-hidden', className)}>
	<!-- Refresh Indicator -->
	<div
		bind:this={refreshIndicatorRef}
		class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10 
			   flex items-center justify-center w-8 h-8 
			   transition-all duration-300 ease-out opacity-0"
		style="transform: translateY(-100%) translateX(-50%);"
	>
		<div class={cn(
			'w-6 h-6 rounded-full border-2 border-primary border-t-transparent',
			isRefreshing ? 'animate-spin' : ''
		)}></div>
	</div>
	
	<!-- Content Container -->
	<div
		bind:this={containerRef}
		class="h-full overflow-y-auto transition-transform duration-300 ease-out"
		style="transform: translateY(0);"
	>
		{@render children?.()}
	</div>
</div>

<style>
	/* Hide default pull-to-refresh on webkit browsers */
	:global(html) {
		overscroll-behavior-y: contain;
	}
</style>