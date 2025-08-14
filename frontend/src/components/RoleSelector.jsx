export default function RoleSelector({ selectedRole, onChange }) {
  return (
    <div className="p-3 border-b bg-gray-100">
      <select
        value={selectedRole}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default</option>
        <option value="teacher">Teacher</option>
        <option value="doctor">Doctor</option>
        <option value="developer">Developer</option>
        <option value="friend">Friend</option>
      </select>
    </div>
  );
}
