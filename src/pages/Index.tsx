import { useState } from 'react';
import { CommandInput } from '@/components/CommandInput';
import { PlatformPanel } from '@/components/PlatformPanel';
import { SystemStatus } from '@/components/SystemStatus';
import { MultiAgentSystem } from '@/services/multiAgentSystem';
import { AgentResponse } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';
import { Bot, Zap } from 'lucide-react';

const Index = () => {
  const [responses, setResponses] = useState<AgentResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandCount, setCommandCount] = useState(0);
  const [lastActivity, setLastActivity] = useState<Date>();
  const { toast } = useToast();

  const handleCommand = async (command: string) => {
    setIsProcessing(true);
    setCommandCount(prev => prev + 1);
    
    try {
      const newResponses = await MultiAgentSystem.processCommand({
        text: command,
        timestamp: new Date()
      });
      
      setResponses(prev => [...prev, ...newResponses]);
      setLastActivity(new Date());
      
      // Show toast notification
      const successCount = newResponses.filter(r => r.status === 'success').length;
      const errorCount = newResponses.filter(r => r.status === 'error').length;
      
      if (successCount > 0) {
        toast({
          title: "Command Executed",
          description: `${successCount} action(s) completed successfully`,
        });
      }
      
      if (errorCount > 0) {
        toast({
          title: "Some Actions Failed", 
          description: `${errorCount} action(s) encountered errors`,
          variant: "destructive"
        });
      }
      
    } catch (error) {
      toast({
        title: "System Error",
        description: "Failed to process command",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Multi-Agent Bot System</h1>
              <p className="text-sm text-muted-foreground">
                Automate Twitch, Discord, and Instagram with natural language commands
              </p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8">
          {/* Command Input Section */}
          <CommandInput onSubmit={handleCommand} isProcessing={isProcessing} />
          
          {/* Status and Platform Panels */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* System Status - Takes 1 column */}
            <div className="xl:col-span-1">
              <SystemStatus 
                totalCommands={commandCount}
                isProcessing={isProcessing}
                lastActivity={lastActivity}
              />
            </div>
            
            {/* Platform Panels - Take remaining 3 columns */}
            <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlatformPanel platform="twitch" responses={responses} />
              <PlatformPanel platform="discord" responses={responses} />
              <PlatformPanel platform="instagram" responses={responses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
