import { CommandInput, AgentResponse, CommandIntent } from '../types/agent';
import { CommandRouter } from './commandRouter';
import { TwitchAgent } from './agents/twitchAgent';
import { DiscordAgent } from './agents/discordAgent';
import { InstagramAgent } from './agents/instagramAgent';

export class MultiAgentSystem {
  static async processCommand(input: CommandInput): Promise<AgentResponse[]> {
    const intent = CommandRouter.parseCommand(input.text);
    const responses: AgentResponse[] = [];

    // Handle unknown commands
    if (intent.action === 'unknown') {
      responses.push({
        platform: 'discord',
        status: 'error',
        message: `Unknown command: "${input.text}". Type "help" to see available commands.`,
        timestamp: new Date(),
        action: 'unknown'
      });
      return responses;
    }

    // Route to appropriate agents based on intent
    try {
      switch (intent.action) {
        case 'check_stream':
          responses.push(await TwitchAgent.checkStreamStatus());
          break;

        case 'notify_live':
          // First check if stream is live
          const streamInfo = await TwitchAgent.getStreamInfo();
          if (streamInfo?.isLive) {
            responses.push(await TwitchAgent.checkStreamStatus());
            responses.push(await DiscordAgent.notifyStreamLive(
              streamInfo.title || 'Live Stream',
              streamInfo.url || '',
              intent.parameters.customMessage
            ));
          } else {
            responses.push({
              platform: 'twitch',
              status: 'error',
              message: 'Cannot notify - stream is not currently live',
              timestamp: new Date(),
              action: 'notify_live'
            });
          }
          break;

        case 'get_latest_reel':
          responses.push(await InstagramAgent.getLatestReel());
          break;

        case 'notify_reel':
          // Get latest reel and share to Discord
          const reelResponse = await InstagramAgent.getLatestReel();
          responses.push(reelResponse);
          
          if (reelResponse.status === 'success' && reelResponse.data) {
            responses.push(await DiscordAgent.shareInstagramReel(
              reelResponse.data.permalink,
              reelResponse.data.caption,
              intent.parameters.customMessage
            ));
          }
          break;

        case 'post_live_story':
          responses.push(await InstagramAgent.postStory(
            intent.parameters.storyText || 'Going live now! 🔴'
          ));
          break;

        case 'show_help':
          responses.push(await DiscordAgent.showHelp());
          break;

        default:
          responses.push({
            platform: 'discord',
            status: 'error',
            message: `Action "${intent.action}" not implemented yet.`,
            timestamp: new Date(),
            action: intent.action
          });
      }
    } catch (error) {
      responses.push({
        platform: 'discord',
        status: 'error',
        message: `System error: ${error}`,
        timestamp: new Date(),
        action: 'system_error'
      });
    }

    return responses;
  }

  static async executeWorkflow(commands: string[]): Promise<AgentResponse[]> {
    const allResponses: AgentResponse[] = [];
    
    for (const command of commands) {
      const input: CommandInput = {
        text: command,
        timestamp: new Date()
      };
      
      const responses = await this.processCommand(input);
      allResponses.push(...responses);
      
      // Add small delay between commands to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return allResponses;
  }
}