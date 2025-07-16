import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface SystemStatusProps {
  totalCommands: number;
  isProcessing: boolean;
  lastActivity?: Date;
}

export const SystemStatus = ({ totalCommands, isProcessing, lastActivity }: SystemStatusProps) => {
  const formatLastActivity = (date?: Date) => {
    if (!date) return 'No activity yet';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  return (
    <Card className="border-accent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>System Status</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Connection Status</span>
          <div className="flex items-center space-x-2">
            {isProcessing ? (
              <WifiOff className="h-4 w-4 text-yellow-500" />
            ) : (
              <Wifi className="h-4 w-4 text-green-500" />
            )}
            <Badge variant={isProcessing ? "outline" : "default"}>
              {isProcessing ? 'Processing' : 'Ready'}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Commands Processed</span>
          <Badge variant="outline">{totalCommands}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Activity</span>
          <span className="text-sm">{formatLastActivity(lastActivity)}</span>
        </div>
        
        <div className="pt-2 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm font-medium text-twitch">Twitch</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
            <div>
              <div className="text-sm font-medium text-discord">Discord</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
            <div>
              <div className="text-sm font-medium text-instagram">Instagram</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};