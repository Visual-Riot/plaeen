import React, { useState } from "react";

interface Team {
  id: string;
  teamName: string; // Ensure this key exists in your team data
}

interface TeamSelectionModalProps {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
  onClose: () => void;
}

const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
  teams,
  onSelectTeam,
  onClose,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handleConfirm = () => {
    if (selectedTeam) {
      onSelectTeam(selectedTeam);
      onClose(); // Close the modal after confirming
    }
  };

  console.log('Teams inside modal:', teams); // Debug: log teams to ensure correct data

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Select a Team</h2>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.teamName} {/* Ensure this exists */}
            </option>
          ))}
        </select>

        {selectedTeam && (
          <button
            onClick={handleConfirm}
            className="mt-4 p-2 bg-green text-white rounded-md w-full"
          >
            Confirm
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-2 p-2 bg-red text-white rounded-md w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeamSelectionModal;
