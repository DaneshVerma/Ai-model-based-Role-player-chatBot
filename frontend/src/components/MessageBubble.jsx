// src/components/MessageBubble.jsx
export default function MessageBubble({ role, text }) {
  const isAssistant = role === "assistant";
  return (
    <div className={`mb-2 ${isAssistant ? "text-green-400" : "text-blue-400"}`}>
      <b>{role}:</b> {text}
    </div>
  );
}
