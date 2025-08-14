export default function ChatMessage({ message }) {
  const isUser = message.role;

  return (
    <div
      className={`flex ${
        isUser === "user" ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
          isUser === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
