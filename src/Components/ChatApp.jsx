import React, { useState } from 'react';
import GroupList from './GroupList/GroupList';
import ChatWindow from './ChatWindow/ChatWindow';
import InviteForm from './InviteForm/InviteForm';

const ChatApp = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  const createGroup = (groupName) => {
    const newGroup = { name: groupName, members: [], messages: [] };
    setGroups([...groups, newGroup]);
  };

  const selectGroup = (group) => {
    setCurrentGroup(group);
  };

  const sendFile = (file) => {
    if (currentGroup && file) {
      const newMessage = { type: 'file', name: file.name };
      const updatedGroup = {
        ...currentGroup,
        messages: [...currentGroup.messages, newMessage],
      };
      setGroups(groups.map(g => g.name === currentGroup.name ? updatedGroup : g));
      setCurrentGroup(updatedGroup);
    }
  };

  return (
    <div className="chat-app">
      <GroupList groups={groups} onCreateGroup={createGroup} onSelectGroup={selectGroup} />
      {currentGroup ? (
        <>
          <ChatWindow group={currentGroup} />
          <InviteForm group={currentGroup} />
          <div>
            <input type="file" onChange={(e) => sendFile(e.target.files[0])} />
            <button>Envoyer le fichier</button>
          </div>
        </>
      ) : (
        <div>Sélectionnez un groupe pour commencer</div>
      )}
    </div>
  );
};

export default ChatApp;
