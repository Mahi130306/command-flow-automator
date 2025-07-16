// Platform configuration file for API tokens and settings
// Replace these with your actual API credentials

export interface PlatformConfig {
  twitch: {
    clientId: string;
    clientSecret: string;
    username: string;
    channelId: string;
  };
  discord: {
    botToken: string;
    webhookUrl: string;
    channelId: string;
    guildId: string;
  };
  instagram: {
    accessToken: string;
    userId: string;
    // Note: Instagram Basic Display API for personal use
    // or Instagram Graph API for business accounts
  };
}

// Default configuration - replace with your actual credentials
export const platformConfig: PlatformConfig = {
  twitch: {
    clientId: "your_twitch_client_id",
    clientSecret: "your_twitch_client_secret", 
    username: "your_twitch_username",
    channelId: "your_twitch_channel_id"
  },
  discord: {
    botToken: "your_discord_bot_token",
    webhookUrl: "your_discord_webhook_url",
    channelId: "your_discord_channel_id",
    guildId: "your_discord_guild_id"
  },
  instagram: {
    accessToken: "your_instagram_access_token",
    userId: "your_instagram_user_id"
  }
};

// API endpoints
export const API_ENDPOINTS = {
  twitch: {
    streams: "https://api.twitch.tv/helix/streams",
    users: "https://api.twitch.tv/helix/users",
    oauth: "https://id.twitch.tv/oauth2/token"
  },
  discord: {
    messages: "https://discord.com/api/v10/channels",
    webhook: "https://discord.com/api/webhooks"
  },
  instagram: {
    media: "https://graph.instagram.com/me/media",
    userInfo: "https://graph.instagram.com/me"
  }
} as const;