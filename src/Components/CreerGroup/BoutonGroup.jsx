import React, { useEffect, useState } from "react";
import "./BoutonGroup.css";
import axios from "axios";
export default function BoutonGroup({ selectGroup, setSelect2Group }) {
  const [groupName, setGroupName] = useState("");
  const [description, setdescription] = useState("");
  const [created_by, setcreated_by] = useState(localStorage.getItem("id"));
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1.0.0/show_group", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(function (response) {
        setData(response.data.data[0]);
        console.log(response.data.data[0]);
      });
  }, [data]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (groupName) {
      const formData = new FormData();
      formData.set("name", groupName);
      formData.set("description", description);
      formData.set("createdBy", created_by); // Ajoute le créateur du groupe si fourni
      try {
       

        axios
          .post("http://127.0.0.1:8000/api/v1.0.0/group", formData)
          .then(function (response) {
            console.log(response.data);
          });
      } catch (error) {
        console.error(
          "Erreur lors de la création du groupe:",
          error.response || error.message
        );
      }
    } else {
      console.error("Le nom du groupe est vide");
    }
  };

    
  const onGroupClique = (group) => {
    setSelect2Group(group);
  }

  return (
    <div className="sidebar">
      <h2>Groupes</h2>
      <div className="group-list">
        {data.map((group, index) => (
          <div
            key={index}
            className="group-item"
            onClick={() => {
              onGroupClique(group);
            }}
          >
            {group.name}
          </div>
        ))}
      </div>
      <form className="create-group" onSubmit={handleCreateGroup}>
        <input
          type="hidden"
          placeholder="Nom du groupe"
          value={created_by}
          onChange={(e) => setcreated_by(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom du groupe"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <input
          type="text"
          placeholder="descriptions du groupe"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button type="submit">Créer un Groupe</button>
      </form>
      {/* <BoutonGroup /> */}
    </div>
  );
}
