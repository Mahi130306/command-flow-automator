import { CommandIntent } from '../types/agent';

export class CommandRouter {
  // Simple rule-based intent detection
  // In production, you could use NLP libraries or AI APIs
  
  private static patterns = [
    {
      pattern: /check.*twitch.*live|twitch.*status|stream.*live/i,
      action: 'check_stream',
      platforms: ['twitch']
    },
    {
      pattern: /notify.*discord.*live|send.*discord.*live|discord.*stream/i,
      action: 'notify_live',
      platforms: ['discord', 'twitch']
    },
    {
      pattern: /instagram.*reel|last.*reel|recent.*reel/i,
      action: 'get_latest_reel',
      platforms: ['instagram']
    },
    {
      pattern: /notify.*discord.*reel|send.*reel.*discord/i,
      action: 'notify_reel',
      platforms: ['discord', 'instagram']
    },
    {
      pattern: /post.*story.*live|story.*going.*live/i,
      action: 'post_live_story',
      platforms: ['instagram']
    },
    {
      pattern: /faq|help|commands/i,
      action: 'show_help',
      platforms: ['discord']
    }
  ];

  static parseCommand(text: string): CommandIntent {
    const normalizedText = text.toLowerCase().trim();
    
    for (const rule of this.patterns) {
      if (rule.pattern.test(normalizedText)) {
        return {
          action: rule.action,
          platform: rule.platforms,
          parameters: this.extractParameters(text, rule.action),
          confidence: 0.9
        };
      }
    }

    // Fallback for unknown commands
    return {
      action: 'unknown',
      platform: [],
      parameters: { originalText: text },
      confidence: 0.1
    };
  }

  private static extractParameters(text: string, action: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    switch (action) {
      case 'notify_live':
      case 'notify_reel':
        // Extract custom message if provided
        const messageMatch = text.match(/message[:\s]+"([^"]+)"/i) || 
                            text.match(/say[:\s]+"([^"]+)"/i);
        if (messageMatch) {
          params.customMessage = messageMatch[1];
        }
        break;
      
      case 'post_live_story':
        // Extract story text
        const storyMatch = text.match(/story[:\s]+"([^"]+)"/i);
        if (storyMatch) {
          params.storyText = storyMatch[1];
        } else {
          params.storyText = "Going live now! 🔴";
        }
        break;
    }

    return params;
  }

  static getCommandSuggestions(): string[] {
    return [
      "Check if Twitch stream is live",
      "Notify Discord that I'm live on Twitch", 
      "Show the last Instagram reel",
      "Send the last reel to Discord",
      "Post story: \"Going live now\"",
      "Show help and commands"
    ];
  }
}