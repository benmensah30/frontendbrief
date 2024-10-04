import React, { useState } from "react";
import "./Chat_View.css";
import { useEffect } from "react";
import axios from "axios";

export default function Chat_View({ selectGroup2 }) {
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState([]);
  const [groups, setGroups] = useState([]);

  const [currentGroup, setCurrentGroup] = useState(null);
  const [message, setMessage] = useState("");

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setError(false);

    if (groupName) {
      setGroups([...groups, { name: groupName, messages: [] }]);
      setGroupName("");
    }

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1.0.0/groups/{groupId}/members",
      formData
    );
  };

  const handleSubmitFiles = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("file", file);
    
    const response = await axios.post(
      `http://127.0.0.1:8000/api/v1.0.0/groups_2/20`,
      formData, {
        headers: { 
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        },
      }
    );

    console.log(response.data);
    
    
  };
  
  const handleFiles = (e) => {
    setFile(e.target.files[0]);
  };

  const selectGroup = (group) => {
    setCurrentGroup(group);
  };
  
  const groupeRequestFunction = async () => {
    const filesResponse = await axios.get(
      `http://127.0.0.1:8000/api/v1.0.0/show_files/3`,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    
    setFile(() => filesResponse.data.data[0]);
    console.log(file);
  };
  
  useEffect(() => {
    groupeRequestFunction();
  }, []);
  
  useEffect(() => {
    groupeRequestFunction();
  }, [selectGroup2]);
  
  useEffect(() => {
    groupeRequestFunction();
  }, []);
  
  console.log(currentGroup);
  const handleSendFile = () => {
    if (file && currentGroup) {
      currentGroup.messages.push({ type: "file", name: file.name });
      setFile(null);
    }
  };
  return (
    <div>
      {file ? (
        <>
          <h2>{selectGroup2.name}</h2>
          <div className="chat-box">
            {Array.isArray(file) && file.length > 0 ? (
              file.map((file, index) => (
                <div key={index} className="message">
                  {file.type === "file" ? (
                    <div className="file-message">
                      Fichier envoyé: <strong>{file.file}</strong>
                    </div>
                  ) : (
                    <div>{file.file}</div>
                  )}
                </div>
              ))
            ) : (
              <p>Aucun message disponible</p>
            )}
          </div>

          <form className="send-file" onSubmit={handleSubmitFiles}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSendFile}>Envoyer Fichier</button>
          </form>
        </>
      ) : (
        <div className="no-group-selected">
          Sélectionnez un groupe pour commencer à discuter
        </div>
      )}
      {currentGroup ? (
        <>
          <h2>{currentGroup.name}</h2>
          <div className="chat-box">
            {Array.isArray(currentGroup.messages) &&
            currentGroup.messages.length > 0 ? (
              currentGroup.messages.map((msg, index) => (
                <div key={index} className="message">
                  {msg.type === "file" ? (
                    <div className="file-message">
                      Fichier envoyé: <strong>{msg.name}</strong>
                    </div>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                </div>
              ))
            ) : (
              <p>Aucun message disponible</p>
            )}

            {message.map((msg, index) => (
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
    </div>
  );
}
