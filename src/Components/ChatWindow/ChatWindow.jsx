import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ group }) => {
  return (
    <div className="chat-window">
      <h2>Discussion: {group.name}</h2>
      <div className="messages">
        {group.messages.length === 0 ? (
          <div>Aucun message pour l'instant</div>
        ) : (
          group.messages.map((msg, index) => (
            <div key={index}>
              {msg.type === 'file' ? (
                <div>Fichier: {msg.name}</div>
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
