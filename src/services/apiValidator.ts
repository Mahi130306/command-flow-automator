import { platformConfig } from '@/config/platforms';

export interface ValidationResult {
  isValid: boolean;
  platform: string;
  errors: string[];
  suggestions: string[];
}

export class APIValidator {
  static validateTwitchConfig(): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (platformConfig.twitch.clientId === "your_twitch_client_id") {
      errors.push("Twitch Client ID not configured");
      suggestions.push("Get Client ID from https://dev.twitch.tv/console");
    }

    if (platformConfig.twitch.clientSecret === "your_twitch_client_secret") {
      errors.push("Twitch Client Secret not configured");
      suggestions.push("Generate Client Secret in Twitch Developer Console");
    }

    if (platformConfig.twitch.username === "your_twitch_username") {
      errors.push("Twitch username not configured");
      suggestions.push("Set your actual Twitch channel username");
    }

    return {
      isValid: errors.length === 0,
      platform: 'twitch',
      errors,
      suggestions
    };
  }

  static validateDiscordConfig(): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (platformConfig.discord.webhookUrl === "your_discord_webhook_url") {
      errors.push("Discord webhook URL not configured");
      suggestions.push("Create webhook in Discord server settings > Integrations");
    } else if (!platformConfig.discord.webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
      errors.push("Invalid Discord webhook URL format");
      suggestions.push("Webhook URL should start with 'https://discord.com/api/webhooks/'");
    }

    if (platformConfig.discord.botToken === "your_discord_bot_token") {
      errors.push("Discord bot token not configured");
      suggestions.push("Create bot at https://discord.com/developers/applications");
    }

    return {
      isValid: errors.length === 0,
      platform: 'discord',
      errors,
      suggestions
    };
  }

  static validateInstagramConfig(): ValidationResult {
    const errors: string[] = [];
    const suggestions: string[] = [];

    if (platformConfig.instagram.accessToken === "your_instagram_access_token") {
      errors.push("Instagram access token not configured");
      suggestions.push("Get token from Instagram Basic Display API or Graph API");
    } else if (platformConfig.instagram.accessToken.length < 20) {
      errors.push("Instagram access token appears invalid");
      suggestions.push("Ensure you're using a valid long-lived access token");
    }

    if (platformConfig.instagram.userId === "your_instagram_user_id") {
      errors.push("Instagram user ID not configured");
      suggestions.push("Get your Instagram user ID from the API response");
    }

    return {
      isValid: errors.length === 0,
      platform: 'instagram',
      errors,
      suggestions
    };
  }

  static validateAllConfigs(): { [key: string]: ValidationResult } {
    return {
      twitch: this.validateTwitchConfig(),
      discord: this.validateDiscordConfig(),
      instagram: this.validateInstagramConfig()
    };
  }

  static getConfigurationStatus(): {
    totalPlatforms: number;
    configuredPlatforms: number;
    validationResults: { [key: string]: ValidationResult };
  } {
    const validationResults = this.validateAllConfigs();
    const configuredPlatforms = Object.values(validationResults)
      .filter(result => result.isValid).length;

    return {
      totalPlatforms: 3,
      configuredPlatforms,
      validationResults
    };
  }
}