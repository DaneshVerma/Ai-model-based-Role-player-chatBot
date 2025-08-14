const RoleSelector = ({ setRole, role})=>{
  return (
    <div className="p-3 border-b">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded mr-2"
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

export default RoleSelector
