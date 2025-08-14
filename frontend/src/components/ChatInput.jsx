// src/components/ChatInput.jsx
export default function ChatInput({ input, setInput, role, setRole, onSend }) {
  return (
    <div className="flex p-2 bg-gray-800">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded mr-2"
      >
        <option value="teacher">Teacher</option>
        <option value="developer">Developer</option>
        <option value="doctor">Doctor</option>
      </select>
      <input
        className="flex-1 p-2 bg-gray-700 rounded mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="bg-blue-500 px-4 py-2 rounded" onClick={onSend}>
        Send
      </button>
    </div>
  );
}
