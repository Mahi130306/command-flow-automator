import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowRight, Bot, MessageSquare, Radio, Instagram, Globe } from 'lucide-react';

export const SystemFlowDiagram = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Multi-Agent System Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Input Layer */}
          <div className="text-center">
            <div className="inline-block p-4 bg-primary/10 rounded-lg border border-primary/20">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Text Command Input</h3>
              <p className="text-xs text-muted-foreground">Natural language commands</p>
            </div>
            <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto mt-4" />
          </div>

          {/* Processing Layer */}
          <div className="text-center">
            <div className="inline-block p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <Bot className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Command Router Agent</h3>
              <p className="text-xs text-muted-foreground">Intent detection & routing</p>
            </div>
            <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto mt-4" />
          </div>

          {/* Platform Agents Layer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Radio className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Twitch Agent</h3>
                <Badge variant="outline" className="text-xs mt-1">Stream Status</Badge>
                <div className="mt-2 text-xs text-muted-foreground">
                  • Check live status<br/>
                  • Get stream info<br/>
                  • OAuth authentication
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Discord Agent</h3>
                <Badge variant="outline" className="text-xs mt-1">Messaging</Badge>
                <div className="mt-2 text-xs text-muted-foreground">
                  • Send messages<br/>
                  • Webhook integration<br/>
                  • Bot token auth
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <Instagram className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Instagram Agent</h3>
                <Badge variant="outline" className="text-xs mt-1">Media</Badge>
                <div className="mt-2 text-xs text-muted-foreground">
                  • Get latest reels<br/>
                  • Post stories<br/>
                  • Graph API
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
          </div>

          {/* Output Layer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="p-3 bg-accent/50 rounded-lg border">
                <h4 className="font-medium text-sm">Twitch Panel</h4>
                <p className="text-xs text-muted-foreground">Stream data & status</p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-3 bg-accent/50 rounded-lg border">
                <h4 className="font-medium text-sm">Discord Panel</h4>
                <p className="text-xs text-muted-foreground">Message responses</p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-3 bg-accent/50 rounded-lg border">
                <h4 className="font-medium text-sm">Instagram Panel</h4>
                <p className="text-xs text-muted-foreground">Media & story data</p>
              </div>
            </div>
          </div>

          {/* Data Flow Examples */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example Command Flows:</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">"Check Twitch"</Badge>
                <ArrowRight className="h-3 w-3" />
                <span>Router</span>
                <ArrowRight className="h-3 w-3" />
                <span>Twitch Agent</span>
                <ArrowRight className="h-3 w-3" />
                <span>API Call</span>
                <ArrowRight className="h-3 w-3" />
                <span>Twitch Panel</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">"Notify Discord"</Badge>
                <ArrowRight className="h-3 w-3" />
                <span>Router</span>
                <ArrowRight className="h-3 w-3" />
                <span>Multi-Agent</span>
                <ArrowRight className="h-3 w-3" />
                <span>API Calls</span>
                <ArrowRight className="h-3 w-3" />
                <span>Both Panels</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};