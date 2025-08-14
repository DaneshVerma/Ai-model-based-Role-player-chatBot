import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
// frontend/src/components/ChatWindow.jsx
export default function ChatWindow({ messages, isTyping }) {
  return (
    <div className='flex-1 overflow-y-auto p-4 bg-gray-50'>
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
