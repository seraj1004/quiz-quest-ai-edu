
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/components/ChatMessage";
import { Message } from "./types";

interface AITutorChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
}

export function AITutorChat({
  open,
  onOpenChange,
  messages,
  inputValue,
  onInputChange,
  onSendMessage
}: AITutorChatProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Tutor Chat</DialogTitle>
          <DialogDescription>
            Ask questions about this problem to help you understand.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto p-4 -mx-6">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message}
            />
          ))}
        </div>
        
        <DialogFooter className="flex items-center gap-2">
          <Textarea
            value={inputValue}
            onChange={onInputChange}
            placeholder="Type your question here..."
            className="flex-1"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
          <Button onClick={onSendMessage} disabled={!inputValue.trim()}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
