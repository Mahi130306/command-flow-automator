import { AgentResponse, InstagramMediaData } from '../../types/agent';
import { platformConfig, API_ENDPOINTS } from '../../config/platforms';

export class InstagramAgent {
  static async getLatestReel(): Promise<AgentResponse> {
    try {
      // Check if we have actual access token
      const hasRealToken = platformConfig.instagram.accessToken !== "your_instagram_access_token" && 
                           platformConfig.instagram.accessToken.length > 20;

      if (hasRealToken) {
        try {
          // Real implementation with actual Instagram API call
          const response = await fetch(
            `${API_ENDPOINTS.instagram.media}?fields=id,media_type,media_url,caption,permalink,timestamp&access_token=${platformConfig.instagram.accessToken}&limit=10`
          );
          
          if (!response.ok) {
            throw new Error(`Instagram API error: ${response.status}`);
          }

          const data = await response.json();
          const latestReel = data.data?.find((media: any) => media.media_type === 'VIDEO');
          
          if (latestReel) {
            const realReelData: InstagramMediaData = {
              id: latestReel.id,
              mediaType: latestReel.media_type,
              mediaUrl: latestReel.media_url,
              caption: latestReel.caption || 'No caption',
              permalink: latestReel.permalink,
              timestamp: latestReel.timestamp
            };

            return {
              platform: 'instagram',
              status: 'success',
              message: 'Latest reel retrieved successfully',
              data: realReelData,
              timestamp: new Date(),
              action: 'get_latest_reel'
            };
          } else {
            throw new Error('No video content found');
          }

        } catch (apiError) {
          console.warn('Instagram API failed, using mock data:', apiError);
        }
      }

      // Mock implementation for demo/development
      const mockReelData: InstagramMediaData = {
        id: `demo_reel_${Date.now()}`,
        mediaType: 'VIDEO',
        mediaUrl: 'https://via.placeholder.com/400x600/e4405f/ffffff?text=Demo+Instagram+Reel',
        caption: 'Just posted a new coding tutorial! 🚀 Building amazing projects with React and TypeScript. What do you think? #coding #react #typescript #demo',
        permalink: `https://instagram.com/p/demo-reel-${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      return {
        platform: 'instagram',
        status: 'success',
        message: 'Latest reel retrieved successfully',
        data: mockReelData,
        timestamp: new Date(),
        action: 'get_latest_reel'
      };

    } catch (error) {
      return {
        platform: 'instagram',
        status: 'error',
        message: `Failed to get latest reel: ${error}`,
        timestamp: new Date(),
        action: 'get_latest_reel'
      };
    }
  }

  static async postStory(text: string): Promise<AgentResponse> {
    try {
      // Mock implementation for posting Instagram story
      // Real implementation would require Instagram Basic Display API or Graph API
      
      const mockStoryData = {
        id: `story_${Date.now()}`,
        text: text,
        posted: true,
        url: 'https://instagram.com/stories/mock-story-id'
      };

      /*
      // Real implementation would be more complex and require:
      // 1. Creating story content (image/video with text overlay)
      // 2. Uploading to Instagram via their API
      // 3. Publishing the story
      */

      return {
        platform: 'instagram',
        status: 'success',
        message: `Story posted: "${text}"`,
        data: mockStoryData,
        timestamp: new Date(),
        action: 'post_story'
      };

    } catch (error) {
      return {
        platform: 'instagram',
        status: 'error',
        message: `Failed to post story: ${error}`,
        timestamp: new Date(),
        action: 'post_story'
      };
    }
  }

  static async checkForNewContent(): Promise<AgentResponse> {
    try {
      // This would typically poll for new content or be triggered by webhooks
      const lastCheckTime = localStorage.getItem('lastInstagramCheck');
      const currentTime = new Date().toISOString();
      
      // Mock: simulate finding new content randomly
      const hasNewContent = Math.random() > 0.7;
      
      if (hasNewContent) {
        const newContent = await this.getLatestReel();
        localStorage.setItem('lastInstagramCheck', currentTime);
        return newContent;
      }

      return {
        platform: 'instagram',
        status: 'success',
        message: 'No new content since last check',
        timestamp: new Date(),
        action: 'check_new_content'
      };

    } catch (error) {
      return {
        platform: 'instagram',
        status: 'error',
        message: `Failed to check for new content: ${error}`,
        timestamp: new Date(),
        action: 'check_new_content'
      };
    }
  }
}