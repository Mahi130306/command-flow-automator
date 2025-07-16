import { AgentResponse } from '@/types/agent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Twitch, MessageSquare, Instagram, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformPanelProps {
  platform: 'twitch' | 'discord' | 'instagram';
  responses: AgentResponse[];
}

const platformConfig = {
  twitch: {
    name: 'Twitch',
    icon: Twitch,
    gradient: 'bg-gradient-twitch',
    color: 'twitch',
    border: 'border-twitch/20'
  },
  discord: {
    name: 'Discord', 
    icon: MessageSquare,
    gradient: 'bg-gradient-discord',
    color: 'discord',
    border: 'border-discord/20'
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    gradient: 'bg-gradient-instagram', 
    color: 'instagram',
    border: 'border-instagram/20'
  }
};

const StatusIcon = ({ status }: { status: AgentResponse['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
};

const ResponseItem = ({ response }: { response: AgentResponse }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-3 p-4 rounded-lg bg-accent/50 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StatusIcon status={response.status} />
          <Badge variant={response.status === 'success' ? 'default' : 'destructive'}>
            {response.action || response.status}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTime(response.timestamp)}
        </span>
      </div>
      
      <p className="text-sm">{response.message}</p>
      
      {response.data && (
        <div className="mt-3 p-3 rounded bg-muted/50 border border-border">
          <details className="cursor-pointer">
            <summary className="text-xs font-medium text-muted-foreground mb-2">
              Response Data
            </summary>
            <pre className="text-xs overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export const PlatformPanel = ({ platform, responses }: PlatformPanelProps) => {
  const config = platformConfig[platform];
  const Icon = config.icon;
  const platformResponses = responses.filter(r => r.platform === platform);

  return (
    <Card className={cn("h-[400px] flex flex-col", config.border)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3">
          <div className={cn("p-2 rounded-lg", config.gradient)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span>{config.name}</span>
          {platformResponses.length > 0 && (
            <Badge variant="outline" className="ml-auto">
              {platformResponses.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-6 pb-6">
          {platformResponses.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No activity yet</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {platformResponses
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((response, index) => (
                  <ResponseItem key={index} response={response} />
                ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};