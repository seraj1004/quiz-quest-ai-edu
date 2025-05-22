
import { MessageRole } from "@/components/ChatMessage";

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: Date;
}
