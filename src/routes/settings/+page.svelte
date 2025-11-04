<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import { Separator } from '$lib/components/ui/separator';
	import { User, Lock, Link, Trash2, Shield, Fingerprint, Eye, Activity, MapPin, Bell, Mail, MessageSquare, Megaphone, Palette, Moon, Zap, Sun, Type, HelpCircle, Book, MessageCircle, Bug, Lightbulb, Info, Smartphone, FileText, Scale } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	
	interface SettingItem {
		label: string;
		icon: ComponentType;
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
		icon: ComponentType;
		items: SettingItem[];
	}> = [
		{
			title: 'Account',
			icon: User,
			items: [
				{ label: 'Profile Information', action: 'profile', icon: User },
				{ label: 'Change Password', action: 'password', icon: Lock },
				{ label: 'Connected Accounts', action: 'accounts', icon: Link },
				{ label: 'Delete Account', action: 'delete', icon: Trash2, danger: true }
			]
		},
		{
			title: 'Privacy & Security',
			icon: Shield,
			items: [
				{ label: 'Two-Factor Authentication', toggle: 'security.twoFactor', icon: Shield },
				{ label: 'Biometric Login', toggle: 'security.biometric', icon: Fingerprint },
				{ label: 'Profile Visibility', toggle: 'privacy.profileVisible', icon: Eye },
				{ label: 'Activity Tracking', toggle: 'privacy.activityTracking', icon: Activity },
				{ label: 'Location Sharing', toggle: 'privacy.locationSharing', icon: MapPin }
			]
		},
		{
			title: 'Notifications',
			icon: Bell,
			items: [
				{ label: 'Push Notifications', toggle: 'notifications.push', icon: Bell },
				{ label: 'Email Notifications', toggle: 'notifications.email', icon: Mail },
				{ label: 'SMS Notifications', toggle: 'notifications.sms', icon: MessageSquare },
				{ label: 'Marketing Messages', toggle: 'notifications.marketing', icon: Megaphone }
			]
		},
		{
			title: 'Appearance',
			icon: Palette,
			items: [
				{ label: 'Dark Mode', toggle: 'appearance.darkMode', icon: Moon },
				{ label: 'Reduced Motion', toggle: 'appearance.reducedMotion', icon: Zap },
				{ label: 'High Contrast', toggle: 'appearance.highContrast', icon: Sun },
				{ label: 'Font Size', action: 'fontsize', icon: Type }
			]
		},
		{
			title: 'Support',
			icon: HelpCircle,
			items: [
				{ label: 'Help Center', action: 'help', icon: Book },
				{ label: 'Contact Support', action: 'contact', icon: MessageCircle },
				{ label: 'Bug Report', action: 'bug', icon: Bug },
				{ label: 'Feature Request', action: 'feature', icon: Lightbulb }
			]
		},
		{
			title: 'About',
			icon: Info,
			items: [
				{ label: 'App Version', action: 'version', icon: Smartphone, value: 'v1.0.0' },
				{ label: 'Terms of Service', action: 'terms', icon: FileText },
				{ label: 'Privacy Policy', action: 'privacy', icon: FileText },
				{ label: 'Open Source Licenses', action: 'licenses', icon: Scale }
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

<div class="p-6 space-y-6 pb-24">
	<!-- Header -->
	<section class="text-center py-4">
		<h1 class="text-3xl font-bold mb-2">Settings</h1>
		<p class="text-muted-foreground">Customize your app experience</p>
	</section>
	
	<!-- Settings Sections -->
	{#each settingSections as section}
		<section>
			<div class="flex items-center space-x-2 mb-4 px-1">
				<div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
					<svelte:component this={section.icon} class="w-4 h-4" />
				</div>
				<h2 class="text-base font-semibold">{section.title}</h2>
			</div>
			
			<Card class="overflow-hidden border-border/50">
				{#each section.items as item, i}
					{#if item.toggle}
						<div class={`flex items-center justify-between p-4 ${i < section.items.length - 1 ? 'border-b border-border/50' : ''}`}>
							<div class="flex items-center space-x-3 flex-1">
								<div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/50">
									<svelte:component this={item.icon} class="w-5 h-5 text-muted-foreground" />
								</div>
								<span class="font-medium text-sm">{item.label}</span>
							</div>
							<Switch
								checked={getToggleValue(item.toggle)}
								onCheckedChange={(checked) => setToggleValue(item.toggle!, checked)}
							/>
						</div>
					{:else if item.action}
						<button
							type="button"
							onclick={() => handleAction(item.action!)}
							class={`flex items-center justify-between w-full p-4 hover:bg-accent/50 transition-all ${i < section.items.length - 1 ? 'border-b border-border/50' : ''} ${item.danger ? 'text-destructive' : ''}`}
						>
							<div class="flex items-center space-x-3 flex-1">
								<div class={`flex items-center justify-center w-10 h-10 rounded-xl ${item.danger ? 'bg-destructive/10' : 'bg-accent/50'}`}>
									<svelte:component this={item.icon} class={`w-5 h-5 ${item.danger ? 'text-destructive' : 'text-muted-foreground'}`} />
								</div>
								<span class={`font-medium text-sm ${item.danger ? 'font-semibold' : ''}`}>
									{item.label}
								</span>
							</div>
							{#if item.value}
								<span class="text-xs text-muted-foreground">{item.value}</span>
							{/if}
						</button>
					{/if}
				{/each}
			</Card>
		</section>
	{/each}
	
	<!-- Sign Out Button -->
	<section class="pt-4">
		<Button variant="outline" class="w-full rounded-xl py-6 text-destructive hover:bg-destructive/10 border-destructive/30">
			Sign Out
		</Button>
	</section>
	
	<!-- App Info -->
	<section class="text-center space-y-2 pt-6 pb-4">
		<div class="text-muted-foreground text-sm">
			<p class="font-medium">Native Web App</p>
			<p>Built with SvelteKit & Tailwind CSS</p>
			<p class="mt-2 text-xs">v1.0.0</p>
		</div>
	</section>
</div>