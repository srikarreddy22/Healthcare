import { useChatbot } from "@/hooks/useChatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, AlertTriangle, Phone, Mail, X, Trash2, Send } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatBot = () => {
  const { messages, input, setInput, send, loading, alert, dismissAlert, clearConversation } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {alert.show && (
        <div className="mb-3 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/20 p-4 max-w-sm shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-red-800 dark:text-red-200 text-sm">🚨 Emergency Alert</h3>
                <Button size="sm" variant="ghost" onClick={dismissAlert} className="h-6 w-6 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                We've detected concerning language and are taking immediate action to ensure your safety.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3 h-3 text-red-600" />
                  <span className="text-red-700 dark:text-red-300">
                    {alert.guardianPhone ? `📞 Calling guardian: ${alert.guardianPhone}` : 'No guardian contact available'}
                  </span>
                </div>
                
                {alert.phoneNumber && (
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="w-3 h-3 text-red-600" />
                    <span className="text-red-700 dark:text-red-300">
                      📞 Calling counselor: {alert.phoneNumber}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3 h-3 text-red-600" />
                  <span className="text-red-700 dark:text-red-300">
                    📱 SMS & Email notifications sent
                  </span>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-xs text-red-800 dark:text-red-200 font-medium">
                  💙 You are not alone. Help is on the way. Please stay safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Card className="w-80 h-96 border-0 shadow-large bg-background/80 backdrop-blur rounded-2xl flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium">Wellness Assistant</p>
          </div>
          {messages.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={clearConversation}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              title="Clear conversation"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start a conversation</p>
              <p className="text-xs">I'm here to listen and support you</p>
            </div>
          ) : (
            <>
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl text-sm bg-muted text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Assistant is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex items-center gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your message..." 
            className="h-10 flex-1" 
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <Button 
            className="h-10 px-3" 
            onClick={send} 
            disabled={loading || !input.trim()}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;


