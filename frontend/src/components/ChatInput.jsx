import RoleSelector from "./RoleSelector";

export default function ChatInput({ input, setInput, role, setRole, onSend }) {
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // shift+enter can be used for new line in textarea
      e.preventDefault(); // prevent unwanted form submission/page reload
      onSend();
    }
  };

  return (
    <div className='flex p-2 bg-gray-800'>
      <RoleSelector setRole={setRole} role={role} />
      <input
        className='flex-1 p-2 bg-gray-700 rounded mr-2'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Type your message...'
      />
      <button
        className='bg-blue-500 px-4 py-2 rounded'
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
}
