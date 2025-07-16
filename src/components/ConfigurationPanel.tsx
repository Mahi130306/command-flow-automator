import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { APIValidator, ValidationResult } from '@/services/apiValidator';
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight, Settings, ExternalLink } from 'lucide-react';

export const ConfigurationPanel = () => {
  const [validationResults, setValidationResults] = useState<{ [key: string]: ValidationResult }>({});
  const [configStatus, setConfigStatus] = useState({ totalPlatforms: 0, configuredPlatforms: 0 });
  const [expandedPlatforms, setExpandedPlatforms] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const status = APIValidator.getConfigurationStatus();
    setValidationResults(status.validationResults);
    setConfigStatus({
      totalPlatforms: status.totalPlatforms,
      configuredPlatforms: status.configuredPlatforms
    });
  }, []);

  const togglePlatform = (platform: string) => {
    setExpandedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const getStatusIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusBadge = (isValid: boolean) => {
    return (
      <Badge variant={isValid ? "default" : "destructive"}>
        {isValid ? "Configured" : "Needs Setup"}
      </Badge>
    );
  };

  const platformInfo = {
    twitch: {
      name: "Twitch",
      description: "Stream status and notifications",
      docsUrl: "https://dev.twitch.tv/docs/api/",
      setupSteps: [
        "Create app at https://dev.twitch.tv/console",
        "Copy Client ID and Client Secret",
        "Set your Twitch username"
      ]
    },
    discord: {
      name: "Discord",
      description: "Message sending via webhook",
      docsUrl: "https://discord.com/developers/docs/resources/webhook",
      setupSteps: [
        "Go to Server Settings > Integrations",
        "Create a new webhook",
        "Copy the webhook URL"
      ]
    },
    instagram: {
      name: "Instagram",
      description: "Media fetching and story posting",
      docsUrl: "https://developers.facebook.com/docs/instagram-basic-display-api",
      setupSteps: [
        "Create app at Facebook Developers",
        "Set up Instagram Basic Display API",
        "Generate long-lived access token"
      ]
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Platform Configuration</CardTitle>
          </div>
          <Badge variant="outline">
            {configStatus.configuredPlatforms}/{configStatus.totalPlatforms} Configured
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Configure your API credentials in <code>src/config/platforms.ts</code> to enable real API calls.
            Currently using mock data for demo purposes.
          </AlertDescription>
        </Alert>

        {Object.entries(validationResults).map(([platform, result]) => {
          const info = platformInfo[platform as keyof typeof platformInfo];
          const isExpanded = expandedPlatforms[platform];

          return (
            <Collapsible key={platform} open={isExpanded} onOpenChange={() => togglePlatform(platform)}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.isValid)}
                    <div>
                      <h3 className="font-semibold">{info.name}</h3>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(result.isValid)}
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-3 mt-3">
                  {result.errors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-red-600">Issues Found:</h4>
                      {result.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-600 flex items-center gap-2">
                          <XCircle className="h-3 w-3" />
                          {error}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Setup Steps:</h4>
                      {info.setupSteps.map((step, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={info.docsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-3 w-3" />
                        API Documentation
                      </a>
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};