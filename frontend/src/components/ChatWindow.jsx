import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
// frontend/src/components/ChatWindow.jsx
const ChatWindow = ({ messages, isTyping }) => {
  console.log("Messages:", messages);
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-700 rounded">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isTyping && (
        <div className="flex justify-end mb-3">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
};
export default ChatWindow;  