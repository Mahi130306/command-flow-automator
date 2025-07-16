// Type definitions for the multi-agent system

export interface CommandInput {
  text: string;
  timestamp: Date;
}

export interface AgentResponse {
  platform: 'twitch' | 'discord' | 'instagram';
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
  timestamp: Date;
  action?: string;
}

export interface TwitchStreamData {
  isLive: boolean;
  title?: string;
  game?: string;
  viewerCount?: number;
  url?: string;
  thumbnailUrl?: string;
}

export interface DiscordMessageData {
  content: string;
  channelId: string;
  messageId?: string;
  sent: boolean;
}

export interface InstagramMediaData {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

export interface AgentState {
  twitch: AgentResponse[];
  discord: AgentResponse[];
  instagram: AgentResponse[];
}

export interface CommandIntent {
  action: string;
  platform: string[];
  parameters: Record<string, any>;
  confidence: number;
}