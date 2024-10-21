import { useState } from "react";
import GreenButton from "@/components/buttons/GreenButton"; // Assuming GreenButton component exists
import OutlineButton from "@/components/buttons/OutlineButton"; // Assuming OutlineButton component exists

interface User {
  id: string;
  name: string;
  image: string;
}

interface AddPlayerModalProps {
  users: User[];
  onAddPlayers: (players: User[]) => void;
  onClose: () => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ users, onAddPlayers, onClose }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    if (selectedPlayers.some((u) => u.id === user.id)) {
      setSelectedPlayers(selectedPlayers.filter((u) => u.id !== user.id));
    } else {
      setSelectedPlayers([...selectedPlayers, user]);
    }
  };

  const handleConfirmSelection = () => {
    // Add logic to send email invitations to selected players here
    onAddPlayers(selectedPlayers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Find other Plaeen members</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a player..."
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* User List with Checkboxes */}
        <ul className="max-h-48 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.id} className="cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPlayers.some((u) => u.id === user.id)}
                    onChange={() => handleSelectUser(user)}
                    className="mr-4"
                  />
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full mr-4" />
                  {user.name}
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No users found</li>
          )}
        </ul>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          {/* Confirm Selection Button */}
          <GreenButton
            onClick={handleConfirmSelection}
            className="w-full mr-2"
          >
            Confirm Selection
          </GreenButton>

          {/* Cancel Button */}
          <OutlineButton onClick={onClose} className="w-full ml-2">
            Cancel
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerModal;
