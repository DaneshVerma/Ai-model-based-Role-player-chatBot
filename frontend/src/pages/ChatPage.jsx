// src/pages/ChatPage.jsx
import { useState } from "react";
import { sendStreamMessage } from "../services/api";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [role, setRole] = useState("teacher");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Add placeholder assistant message
    let assistantMsg = { role: "assistant", text: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      await sendStreamMessage(role, userMsg.text, (partial) => {
        assistantMsg = {
          role: "assistant",
          text: (assistantMsg.text || "") + partial, // append instead of replace
        };
        setMessages((prev) => [...prev.slice(0, -1), assistantMsg]);
      });
    } catch (error) {
      console.error("Streaming error:", error);
      assistantMsg = {
        role: "assistant",
        text: "⚠️ Failed to get response. Please try again.",
      };
      setMessages((prev) => [...prev.slice(0, -1), assistantMsg]);
    }
  };

  return (
    <div className='flex flex-col h-screen p-10 bg-gray-900 text-white'>
        <h1 className="text text-center text-2xl font-bold mb-4">Role Based Chat-bot</h1>
      <ChatWindow messages={messages} />
      <ChatInput
        input={input}
        setInput={setInput}
        role={role}
        setRole={setRole}
        onSend={handleSend}
      />
    </div>
  );
}
