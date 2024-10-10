import React, { useState } from 'react';
import './InviteForm.css';
import axios from 'axios';

const InviteForm = ({ group }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    
    try {
      axios
        .post(`http://127.0.0.1:8000/api/v1.0.0/groups/${localStorage.getItem('groupId')}/members`, formData)
        .then(function (response) {
          console.log(response.data);
        })
    } catch (error) {
      console.error(
        "Erreur lors de la création du groupe:",
        error.response || error.message
      );
    }
    // if (groupName) {
    // } else {
    //   console.error("Le nom du groupe est vide");
    // }
  };

  const inviteMember = () => {
    if (email) {
      alert(`Invitation envoyée à ${email} pour le rejoindre`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invite-form">
      <input
        type="email"
        placeholder="Email du membre"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={inviteMember}>Inviter un membre</button>
    </form>
  );
};

export default InviteForm;
