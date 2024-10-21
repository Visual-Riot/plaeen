import { useState } from "react";
import GreenButton from "@/components/buttons/GreenButton";
import OutlineButton from "@/components/buttons/OutlineButton";

interface User {
  id: string;
  name?: string; // Optional, but we'll handle this case
  image: string;
}

interface SelectedPlayer {
  user: {
    id: string;
    name: string; // Always a string, not optional
    image: string;
  };
  status: string;
}

interface AddPlayerModalProps {
  users: User[];
  onAddPlayers: (players: SelectedPlayer[]) => void; // Expect SelectedPlayer[]
  onClose: () => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ users, onAddPlayers, onClose }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    const existingPlayer = selectedPlayers.find((p) => p.user.id === user.id);

    if (existingPlayer) {
      // If already selected, remove from the list
      setSelectedPlayers(selectedPlayers.filter((p) => p.user.id !== user.id));
    } else {
      // Otherwise, add new player with default status as 'pending', ensuring name is always a string
      const selectedPlayer: SelectedPlayer = {
        user: {
          id: user.id,
          name: user.name || "Unnamed Player", // Ensure name is always a string
          image: user.image,
        },
        status: 'pending',
      };
      setSelectedPlayers([...selectedPlayers, selectedPlayer]);
    }
  };

  const handleConfirmSelection = () => {
    onAddPlayers(selectedPlayers); // Pass SelectedPlayer[]
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
                    checked={selectedPlayers.some((p) => p.user.id === user.id)}
                    onChange={() => handleSelectUser(user)}
                    className="mr-4"
                  />
                  <img src={user.image} alt={user.name || "Unnamed Player"} className="w-8 h-8 rounded-full mr-4" />
                  {user.name || "Unnamed Player"} {/* Safely handle missing names */}
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No users found</li>
          )}
        </ul>

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <GreenButton onClick={handleConfirmSelection} className="w-full mr-2">
            Confirm Selection
          </GreenButton>
          <OutlineButton onClick={onClose} className="w-full ml-2">
            Cancel
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerModal;
