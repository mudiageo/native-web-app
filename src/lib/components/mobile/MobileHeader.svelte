<script lang="ts">
	import { cn } from '$lib/utils.js';
	
	let { 
		title = '',
		showBack = false,
		showMenu = true,
		onMenuClick,
		onBackClick,
		actions = [],
		class: className = ''
	}: { 
		title: string;
		showBack?: boolean;
		showMenu?: boolean;
		onMenuClick?: () => void;
		onBackClick?: () => void;
		actions?: Array<{ icon: string; label: string; onClick: () => void }>;
		class?: string;
	} = $props();
</script>

<header class={cn(
	'sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border',
	'safe-area-inset-top px-safe-area-inset-x',
	className
)}>
	<div class="flex items-center justify-between h-14 px-4">
		<!-- Left Section -->
		<div class="flex items-center space-x-2">
			{#if showBack}
				<button
					type="button"
					onclick={onBackClick}
					class="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors active:scale-95"
					aria-label="Go back"
				>
					<span class="text-xl">←</span>
				</button>
			{:else if showMenu}
				<button
					type="button"
					onclick={onMenuClick}
					class="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors active:scale-95"
					aria-label="Open menu"
				>
					<span class="text-xl">☰</span>
				</button>
			{/if}
		</div>
		
		<!-- Center Section - Title -->
		<div class="flex-1 text-center">
			<h1 class="text-lg font-semibold truncate">{title}</h1>
		</div>
		
		<!-- Right Section - Actions -->
		<div class="flex items-center space-x-1">
			{#each actions as action}
				<button
					type="button"
					onclick={action.onClick}
					class="p-2 rounded-lg hover:bg-accent transition-colors active:scale-95"
					aria-label={action.label}
				>
					<span class="text-xl">{action.icon}</span>
				</button>
			{/each}
		</div>
	</div>
</header>