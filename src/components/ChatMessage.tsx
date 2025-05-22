
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";

export type MessageRole = "assistant" | "user";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: Date;
}

interface ChatMessageProps {
  message: Message;
  user?: {
    name?: string | null;
    image?: string | null;
  };
}

export function ChatMessage({ message, user }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 px-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <UserAvatar 
          user={{ name: "AI Tutor", image: "/bot-avatar.png" }}
          size="sm"
        />
      )}

      <Card
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-foreground"
        )}
      >
        <div className="prose dark:prose-invert">
          <p className="m-0 whitespace-pre-wrap">{message.content}</p>
        </div>
      </Card>

      {isUser && (
        <UserAvatar 
          user={user || { name: "You" }}
          size="sm"
        />
      )}
    </div>
  );
}
