<script lang="ts">
	import '../app.css';
	import MobileLayout from '$lib/components/mobile/MobileLayout.svelte';
	
	let { children } = $props();
</script>

<MobileLayout>
	{@render children()}
</MobileLayout>
