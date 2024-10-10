import React, { useState } from 'react';
import './GroupList.css';

const GroupList = ({ groups, onCreateGroup, onSelectGroup }) => {
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = () => {
    if (newGroupName) {
      onCreateGroup(newGroupName);
      setNewGroupName('');
    }
  };

  return (
    <div className="group-list">
      <h2>Groupes</h2>
      {groups.map((group, index) => (
        <div key={index} onClick={() => onSelectGroup(group)}>
          {group.name}
        </div>
      ))}
      <input
        type="text"
        placeholder="Nom du groupe"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Créer un groupe</button>
    </div>
  );
};

export default GroupList;
