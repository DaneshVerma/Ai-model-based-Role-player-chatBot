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
        <option value="lawyer">lawyer</option>
        <option value="buddy">buddy</option>
        <option value="fitnessTrainer">fitnessTrainer</option>
        <option value="chef">chef</option>
        <option value="travelGuide">travelGuide</option>
        <option value="motivationalCoach">motivationalCoach</option>
        <option value="comedian">comedian</option>
        <option value="techExpert">techExpert</option>
      </select>
    </div>
  );
}

export default RoleSelector
