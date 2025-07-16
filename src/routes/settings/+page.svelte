<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import { Separator } from '$lib/components/ui/separator';
	
	interface SettingItem {
		label: string;
		icon: string;
		action?: string;
		toggle?: string;
		danger?: boolean;
		value?: string;
	}
	let settings = $state({
		notifications: {
			push: true,
			email: false,
			sms: true,
			marketing: false
		},
		privacy: {
			profileVisible: true,
			activityTracking: false,
			dataCollection: true,
			locationSharing: false
		},
		appearance: {
			darkMode: false,
			reducedMotion: false,
			highContrast: false,
			fontSize: 'medium'
		},
		security: {
			twoFactor: true,
			biometric: true,
			sessionTimeout: '30min'
		}
	});
	
	const settingSections: Array<{
		title: string;
		icon: string;
		items: SettingItem[];
	}> = [
		{
			title: 'Account',
			icon: '👤',
			items: [
				{ label: 'Profile Information', action: 'profile', icon: '📝' },
				{ label: 'Change Password', action: 'password', icon: '🔐' },
				{ label: 'Connected Accounts', action: 'accounts', icon: '🔗' },
				{ label: 'Delete Account', action: 'delete', icon: '🗑️', danger: true }
			]
		},
		{
			title: 'Privacy & Security',
			icon: '🔒',
			items: [
				{ label: 'Two-Factor Authentication', toggle: 'security.twoFactor', icon: '🛡️' },
				{ label: 'Biometric Login', toggle: 'security.biometric', icon: '👆' },
				{ label: 'Profile Visibility', toggle: 'privacy.profileVisible', icon: '👁️' },
				{ label: 'Activity Tracking', toggle: 'privacy.activityTracking', icon: '📊' },
				{ label: 'Location Sharing', toggle: 'privacy.locationSharing', icon: '📍' }
			]
		},
		{
			title: 'Notifications',
			icon: '🔔',
			items: [
				{ label: 'Push Notifications', toggle: 'notifications.push', icon: '📱' },
				{ label: 'Email Notifications', toggle: 'notifications.email', icon: '📧' },
				{ label: 'SMS Notifications', toggle: 'notifications.sms', icon: '💬' },
				{ label: 'Marketing Messages', toggle: 'notifications.marketing', icon: '📢' }
			]
		},
		{
			title: 'Appearance',
			icon: '🎨',
			items: [
				{ label: 'Dark Mode', toggle: 'appearance.darkMode', icon: '🌙' },
				{ label: 'Reduced Motion', toggle: 'appearance.reducedMotion', icon: '⚡' },
				{ label: 'High Contrast', toggle: 'appearance.highContrast', icon: '🔆' },
				{ label: 'Font Size', action: 'fontsize', icon: '🔤' }
			]
		},
		{
			title: 'Support',
			icon: '❓',
			items: [
				{ label: 'Help Center', action: 'help', icon: '📚' },
				{ label: 'Contact Support', action: 'contact', icon: '💬' },
				{ label: 'Bug Report', action: 'bug', icon: '🐛' },
				{ label: 'Feature Request', action: 'feature', icon: '💡' }
			]
		},
		{
			title: 'About',
			icon: 'ℹ️',
			items: [
				{ label: 'App Version', action: 'version', icon: '📱', value: 'v1.0.0' },
				{ label: 'Terms of Service', action: 'terms', icon: '📋' },
				{ label: 'Privacy Policy', action: 'privacy', icon: '📄' },
				{ label: 'Open Source Licenses', action: 'licenses', icon: '⚖️' }
			]
		}
	];
	
	function getToggleValue(path: string): boolean {
		const keys = path.split('.');
		let value: any = settings;
		for (const key of keys) {
			value = value[key];
		}
		return value;
	}
	
	function setToggleValue(path: string, newValue: boolean) {
		const keys = path.split('.');
		let obj: any = settings;
		for (let i = 0; i < keys.length - 1; i++) {
			obj = obj[keys[i]];
		}
		obj[keys[keys.length - 1]] = newValue;
		settings = { ...settings };
		
		// Apply theme changes immediately
		if (path === 'appearance.darkMode') {
			document.documentElement.classList.toggle('dark', newValue);
		}
	}
	
	function handleAction(action: string) {
		// In a real app, these would navigate to specific pages or show modals
		console.log('Action:', action);
	}
</script>

<svelte:head>
	<title>Settings - Native Web App</title>
</svelte:head>

<div class="p-4 space-y-6 pb-20">
	<!-- Header -->
	<section class="text-center py-4">
		<h1 class="text-2xl font-bold mb-2">Settings</h1>
		<p class="text-muted-foreground">Customize your app experience</p>
	</section>
	
	<!-- Settings Sections -->
	{#each settingSections as section}
		<section>
			<div class="flex items-center space-x-2 mb-3">
				<span class="text-lg">{section.icon}</span>
				<h2 class="text-lg font-semibold">{section.title}</h2>
			</div>
			
			<Card class="p-0">
				{#each section.items as item, index}
					<div class="p-4 {index < section.items.length - 1 ? 'border-b border-border' : ''}">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<span class="text-lg">{item.icon}</span>
								<div>
									<p class="font-medium {item.danger ? 'text-destructive' : ''}">{item.label}</p>
									{#if item.value}
										<p class="text-sm text-muted-foreground">{item.value}</p>
									{/if}
								</div>
							</div>
							
							{#if item.toggle}
								<Switch
									checked={getToggleValue(item.toggle)}
									onCheckedChange={(checked) => setToggleValue(item.toggle!, checked)}
								/>
							{:else if item.action}
								<button
									onclick={() => handleAction(item.action!)}
									class="text-muted-foreground hover:text-foreground transition-colors"
								>
									<span class="text-lg">→</span>
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</Card>
		</section>
	{/each}
	
	<!-- App Info -->
	<section class="text-center space-y-2 pt-6">
		<div class="text-muted-foreground text-sm">
			<p>Native Web App</p>
			<p>Built with SvelteKit & Tailwind CSS</p>
			<p class="mt-2">Made with ❤️ for mobile</p>
		</div>
	</section>
	
	<!-- Dangerous Actions -->
	<section>
		<Card class="p-4 border-destructive/20">
			<h3 class="font-semibold text-destructive mb-4">Danger Zone</h3>
			<div class="space-y-3">
				<Button variant="destructive" class="w-full">
					<span class="mr-2">⚠️</span>
					Reset All Settings
				</Button>
				<Button variant="outline" class="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
					<span class="mr-2">🚪</span>
					Sign Out
				</Button>
			</div>
		</Card>
	</section>
</div>