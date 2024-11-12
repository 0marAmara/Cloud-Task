import { useState } from 'react';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

const AddGroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupNameError, setGroupNameError] = useState('');
  const [groupTypeError, setGroupTypeError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // Validate group name
    if (groupName.trim().length < 3) {
      setGroupNameError("Group Name should be at least 3 characters.");
      isValid = false;
    } else {
      setGroupNameError('');
    }

    // Validate group type
    if (groupType.trim().length < 3) {
      setGroupTypeError("Group Type should be at least 3 characters.");
      isValid = false;
    } else {
      setGroupTypeError('');
    }

    if (!isValid) return;

    try {
      const groupsRef = ref(database, 'groups');
      await push(groupsRef, {
        groupName,
        groupType,
      });

      setGroupName('');
      setGroupType('');
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white rounded shadow-md w-full ">
      <label className="flex flex-col">
        <span className="text-gray-700">Group Name:</span>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {groupNameError && <span className="text-red-500 text-sm mt-1">{groupNameError}</span>}
      </label>
      
      <label className="flex flex-col">
        <span className="text-gray-700">Group Type:</span>
        <input
          type="text"
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
          className="p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {groupTypeError && <span className="text-red-500 text-sm mt-1">{groupTypeError}</span>}
      </label>
      
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Group
      </button>
    </form>
  );
};

export default AddGroupForm;