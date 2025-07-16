import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CommandRouter } from '@/services/commandRouter';
import { Send, Lightbulb } from 'lucide-react';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  isProcessing: boolean;
}

export const CommandInput = ({ onSubmit, isProcessing }: CommandInputProps) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const suggestions = CommandRouter.getCommandSuggestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim());
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 border-accent">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your command... (e.g., 'Check if Twitch stream is live')"
              className="pr-12 h-12 bg-input border-border text-foreground"
              disabled={isProcessing}
              onFocus={() => setShowSuggestions(true)}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isProcessing}
              className="absolute right-1 top-1 h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showSuggestions ? 'Hide' : 'Show'} Suggestions
            </Button>
            
            {isProcessing && (
              <div className="text-sm text-muted-foreground">
                Processing command...
              </div>
            )}
          </div>
        </form>
      </Card>

      {showSuggestions && (
        <Card className="p-4 border-accent">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Command Suggestions:
          </h3>
          <div className="grid gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-auto p-3 text-left hover:bg-accent"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};