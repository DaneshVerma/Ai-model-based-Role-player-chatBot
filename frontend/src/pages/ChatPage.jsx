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
    const assistantIndex = messages.length + 1;
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      await sendStreamMessage(role, userMsg.text, (partial) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIndex] = { role: "assistant", text: partial }; // update same index
          return updated;
        });
      });
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantIndex] = {
          role: "assistant",
          text: "⚠️ Failed to get response. Please try again.",
        };
        return updated;
      });
    }
  };

  return (
    <div className="flex lg:p-10 p-5 flex-col h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Role GPT</h1>
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
