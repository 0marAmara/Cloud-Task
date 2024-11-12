import { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

interface Group {
  id: string;
  groupName: string;
  groupType: string;
}

const ViewGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cached groups from localStorage if available
    const cachedGroups = localStorage.getItem('cachedGroups');
    if (cachedGroups) {
      setGroups(JSON.parse(cachedGroups));
      setLoading(false); // Show cached data immediately
    }

    const groupsRef = ref(database, 'groups');

    // Fetch data from Firebase
    const unsubscribe = onValue(
      groupsRef,
      (snapshot) => {
        const data = snapshot.val();
        const groupList: Group[] = [];

        for (const id in data) {
          groupList.push({ id, ...data[id] });
        }

        // Update state and cache the data in localStorage
        setGroups(groupList);
        localStorage.setItem('cachedGroups', JSON.stringify(groupList));
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching groups:", error);
        setLoading(false); // Stop loading if there's an error
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading groups...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Groups</h2>

      {groups.length > 0 ? (
        <ul className="space-y-4">
          {groups.map((group) => (
            <li key={group.id} className="p-4 border rounded-lg bg-gray-100">
              <h3 className="text-lg font-medium text-gray-800">{group.groupName}</h3>
              <p className="text-gray-600">Type: {group.groupType}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No groups available.</p>
      )}
    </div>
  );
};

export default ViewGroups;