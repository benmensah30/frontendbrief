import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import './registration.css'



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (email.trim().length < 6 || email.trim().length > 32) {
      setError(true);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (password.trim().length < 6 || password.trim().length > 32) {
      setError(true);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (passwordConfirm.trim() != password.trim()) {
      setError(true);
      const errorMessage = "Les deux mot de passe sont différents";
      toast.error(errorMessage);
      return;
    }

    localStorage.setItem("email", email);

    setIsLoading(true);
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("password_confirm", passwordConfirm);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1.0.0/register",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/otp-code/" + email);
      }, 3000);
    } else {
      console.log(response.data);

      if (response.data.data.name !== undefined) {
        toast.error(response.data.data.name[0]);
      } else if (response.data.data.email !== undefined) {
        toast.error(response.data.data.email[0]);
      } else if (response.data.data.password !== undefined) {
        toast.error(response.data.data.password[0]);
      } else if (response.data.data.passwordConfirm !== undefined) {
        toast.error(response.data.data.passwordConfirm[0]);
      }

      setIsLoading(false);
    }
  };
  return (
    <div id="container">
            <div className="drop drop1"></div>
            <div className="drop drop2"></div>
            <div className="drop drop3"></div>
            <div className="drop drop4"></div>
      <ToastContainer stacked />
      <form action="" onSubmit={handleSubmit}>
      <h3>inscription</h3>
        <p>Renseignez vos information Inscription pour vous inscrire</p>
        <Input
          label={"name"}
          reference={"name"}
          type={"text"}
          value={name}
          placeholder={"Saisir le nom ici"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label={"email"}
          reference={"email"}
          type={"text"}
          value={email}
          placeholder={"Saisir l'adresse e-mail ici"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Input
          label={"Mot de passe"}
          reference={"password"}
          type={"password"}
          value={password}
          placeholder={"Saisir le mot de passe ici"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {/* Afficher les données saisient dans le champ en bat de l'input
        <div>{password}</div> */}

        <Input
          label={"Confirmation"}
          reference={"passwordConfirm"}
          type={"password"}
          value={passwordConfirm}
          placeholder={"Saisir le mot de passe ici"}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />

        <div>
          <Button
            disabled={isLoading}
            type={"submit"}
            text={isLoading ? "Chargement ..." : "Soumettre"}
          />
          <Button type={"reset"} text={"Anuler"} />
        </div>
        <div>
          <Link to={"/"}>Connexion</Link>
        </div>
      </form>
    </div>
  );
}
