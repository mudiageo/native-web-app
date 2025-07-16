<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	
	interface Message {
		id: number;
		text: string;
		sender: 'user' | 'other';
		timestamp: string;
		avatar: string;
		name: string;
	}
	
	interface ChatContact {
		id: number;
		name: string;
		avatar: string;
		lastMessage: string;
		timestamp: string;
		unread: number;
		online: boolean;
	}
	
	// Mock chat data
	const contacts: ChatContact[] = [
		{
			id: 1,
			name: 'Sarah Chen',
			avatar: '👩‍💻',
			lastMessage: 'Hey! How\'s the new project going?',
			timestamp: '2 min ago',
			unread: 2,
			online: true
		},
		{
			id: 2,
			name: 'Mike Rodriguez',
			avatar: '👨‍🎨',
			lastMessage: 'The designs look great! 🎨',
			timestamp: '1 hour ago',
			unread: 1,
			online: true
		},
		{
			id: 3,
			name: 'Team Group',
			avatar: '👥',
			lastMessage: 'Meeting at 3 PM today',
			timestamp: '3 hours ago',
			unread: 0,
			online: false
		},
		{
			id: 4,
			name: 'Emma Wilson',
			avatar: '👩‍🔬',
			lastMessage: 'Thanks for the help!',
			timestamp: 'Yesterday',
			unread: 0,
			online: false
		}
	];
	
	const initialMessages: Message[] = [
		{
			id: 1,
			text: 'Hey! How\'s the new project going?',
			sender: 'other',
			timestamp: '10:30 AM',
			avatar: '👩‍💻',
			name: 'Sarah Chen'
		},
		{
			id: 2,
			text: 'Going really well! I\'ve implemented the mobile navigation and it looks great.',
			sender: 'user',
			timestamp: '10:32 AM',
			avatar: '👤',
			name: 'You'
		},
		{
			id: 3,
			text: 'That\'s awesome! Can you show me a screenshot?',
			sender: 'other',
			timestamp: '10:33 AM',
			avatar: '👩‍💻',
			name: 'Sarah Chen'
		},
		{
			id: 4,
			text: 'Sure! The glass morphism effects turned out particularly nice. The backdrop blur really gives it that native feel.',
			sender: 'user',
			timestamp: '10:35 AM',
			avatar: '👤',
			name: 'You'
		}
	];
	
	let messages = $state(initialMessages);
	
	let currentView: 'contacts' | 'chat' = $state('contacts');
	let selectedContact: ChatContact | null = $state(null);
	let newMessage = $state('');
	let chatContainer: HTMLElement;
	
	function selectContact(contact: ChatContact) {
		selectedContact = contact;
		currentView = 'chat';
		// Mark as read
		contact.unread = 0;
		// Scroll to bottom
		setTimeout(() => scrollToBottom(), 100);
	}
	
	function sendMessage() {
		if (!newMessage.trim()) return;
		
		const message: Message = {
			id: messages.length + 1,
			text: newMessage,
			sender: 'user',
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			avatar: '👤',
			name: 'You'
		};
		
		messages = [...messages, message];
		newMessage = '';
		
		// Scroll to bottom
		setTimeout(() => scrollToBottom(), 100);
		
		// Simulate response after a delay
		setTimeout(() => {
			const responses = [
				'That sounds great!',
				'I agree with that approach.',
				'Let me think about it.',
				'Good point! 👍',
				'Can we discuss this in the next meeting?'
			];
			
			const response: Message = {
				id: messages.length + 1,
				text: responses[Math.floor(Math.random() * responses.length)],
				sender: 'other',
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				avatar: selectedContact?.avatar || '👤',
				name: selectedContact?.name || 'Contact'
			};
			
			messages = [...messages, response];
			setTimeout(() => scrollToBottom(), 100);
		}, 1000 + Math.random() * 2000);
	}
	
	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
	
	function goBack() {
		currentView = 'contacts';
		selectedContact = null;
	}
	
	onMount(() => {
		return () => {};
	});
</script>

<svelte:head>
	<title>Chat - Native Web App</title>
</svelte:head>

{#if currentView === 'contacts'}
	<!-- Contacts List View -->
	<div class="p-4 space-y-4 pb-20">
		<!-- Header -->
		<section class="text-center py-4">
			<h1 class="text-2xl font-bold mb-2">Messages</h1>
			<p class="text-muted-foreground">Stay connected with your team</p>
		</section>
		
		<!-- Search -->
		<section>
			<Input placeholder="Search conversations..." class="w-full" />
		</section>
		
		<!-- Contacts List -->
		<section class="space-y-2">
			{#each contacts as contact}
				<button
					onclick={() => selectContact(contact)}
					class="w-full p-4 bg-background border border-border rounded-lg hover:bg-accent transition-colors text-left"
				>
					<div class="flex items-center space-x-3">
						<div class="relative">
							<span class="text-2xl">{contact.avatar}</span>
							{#if contact.online}
								<span class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
							{/if}
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex items-center justify-between mb-1">
								<h3 class="font-medium truncate">{contact.name}</h3>
								<span class="text-xs text-muted-foreground">{contact.timestamp}</span>
							</div>
							<p class="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
						</div>
						{#if contact.unread > 0}
							<span class="bg-primary text-primary-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
								{contact.unread}
							</span>
						{/if}
					</div>
				</button>
			{/each}
		</section>
		
		<!-- Quick Actions -->
		<section>
			<div class="grid grid-cols-2 gap-3">
				<Button variant="outline" class="flex items-center justify-center space-x-2 p-4">
					<span class="text-lg">👥</span>
					<span>New Group</span>
				</Button>
				<Button variant="outline" class="flex items-center justify-center space-x-2 p-4">
					<span class="text-lg">📞</span>
					<span>Voice Call</span>
				</Button>
			</div>
		</section>
	</div>
{:else if currentView === 'chat' && selectedContact}
	<!-- Chat View -->
	<div class="flex flex-col h-screen">
		<!-- Chat Header -->
		<header class="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border p-4">
			<div class="flex items-center space-x-3">
				<button
					onclick={goBack}
					class="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors"
					aria-label="Go back"
				>
					<span class="text-lg">←</span>
				</button>
				<div class="relative">
					<span class="text-xl">{selectedContact.avatar}</span>
					{#if selectedContact.online}
						<span class="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
					{/if}
				</div>
				<div class="flex-1">
					<h2 class="font-semibold">{selectedContact.name}</h2>
					<p class="text-xs text-muted-foreground">
						{selectedContact.online ? 'Online' : 'Last seen recently'}
					</p>
				</div>
				<div class="flex space-x-1">
					<button class="p-2 rounded-lg hover:bg-accent transition-colors">
						<span class="text-lg">📞</span>
					</button>
					<button class="p-2 rounded-lg hover:bg-accent transition-colors">
						<span class="text-lg">📹</span>
					</button>
				</div>
			</div>
		</header>
		
		<!-- Messages -->
		<main bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
			{#each messages as message}
				<div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="flex items-end space-x-2 max-w-[80%] {message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}">
						{#if message.sender === 'other'}
							<span class="text-lg">{message.avatar}</span>
						{/if}
						<div class="space-y-1">
							<div class="px-4 py-2 rounded-lg {message.sender === 'user' 
								? 'bg-primary text-primary-foreground' 
								: 'bg-accent'}">
								<p class="text-sm">{message.text}</p>
							</div>
							<p class="text-xs text-muted-foreground px-2 {message.sender === 'user' ? 'text-right' : 'text-left'}">
								{message.timestamp}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</main>
		
		<!-- Message Input -->
		<footer class="sticky bottom-16 bg-background/95 backdrop-blur-md border-t border-border p-4">
			<form onsubmit={(e) => { e.preventDefault(); sendMessage(); }} class="flex items-center space-x-2">
				<button type="button" class="p-2 text-muted-foreground hover:text-foreground transition-colors">
					<span class="text-lg">📎</span>
				</button>
				<Input
					bind:value={newMessage}
					placeholder="Type a message..."
					class="flex-1"
				/>
				<button type="button" class="p-2 text-muted-foreground hover:text-foreground transition-colors">
					<span class="text-lg">😊</span>
				</button>
				<Button type="submit" size="sm" disabled={!newMessage.trim()}>
					<span class="text-lg">📤</span>
				</Button>
			</form>
		</footer>
	</div>
{/if}

<style>
	/* Custom scrollbar for chat */
	main::-webkit-scrollbar {
		width: 4px;
	}
	
	main::-webkit-scrollbar-track {
		background: transparent;
	}
	
	main::-webkit-scrollbar-thumb {
		background: hsl(var(--muted));
		border-radius: 2px;
	}
	
	main::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--muted-foreground));
	}
</style>