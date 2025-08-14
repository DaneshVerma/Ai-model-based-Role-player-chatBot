import RoleSelector from "./RoleSelector";

// src/components/ChatInput.jsx
export default function ChatInput({ input, setInput, role, setRole, onSend }) {
  return (
    <div className='flex p-2 bg-gray-800'>
      <RoleSelector setRole={setRole} role={role} />
      <input
        className='flex-1 p-2 bg-gray-700 rounded mr-2'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Type your message...'
      />
      <button className='bg-blue-500 px-4 py-2 rounded' onClick={onSend}>
        Send
      </button>
    </div>
  );
}
