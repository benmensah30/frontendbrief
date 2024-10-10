import React, { useState } from "react";
import "./Dashboard.css";
import BoutonGroup from "../../CreerGroup/BoutonGroup";
import Chat_View from "../../Chat_View/Chat_View";

const Dashboard = ({}) => {
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState(null);
  // const [groups, setGroups] = useState([]);
  const [selectGroup2, setSelect2Group] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [message, setMessage] = useState("");

  const selectGroup = (group) => {
    setCurrentGroup(group);
  };

  return (
    <div className="dashboard">
      <BoutonGroup
        selectGroup={selectGroup}
        setSelect2Group={setSelect2Group}
      />
      <div className="chat-container">
        {currentGroup ? (
          <>
            <h2>{currentGroup.name}</h2>
            <div className="chat-box">
              {currentGroup.messages.map((msg, index) => (
                <div key={index} className="message">
                  {msg.type === "file" ? (
                    <div className="file-message">
                      Fichier envoyé: <strong>{msg.name}</strong>
                    </div>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="send-file">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={handleSendFile}>Envoyer Fichier</button>
            </div>
          </>
        ) : (
          <div className="no-group-selected">
            Sélectionnez un groupe pour commencer à discuter
          </div>
        )}
        <Chat_View selectGroup2={selectGroup2} />
      </div>
    </div>
  );
};

export default Dashboard;
