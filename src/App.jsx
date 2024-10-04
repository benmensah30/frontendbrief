import React, { useState } from 'react'
import Button from './Components/Button/Button'
import Input from './Components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import { toast, ToastContainer } from 'react-toastify'


export default function App() {

const [email, setEmail] = useState('') 
const [password, setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();

const handleSubmit = async(e) => {
  e.preventDefault();
  setIsLoading(true);
  const fromData = new FormData();
  fromData.set("email", email);
  fromData.set("password", password);

  const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/login', fromData);

  try{

    if (response.data.success){
      toast.success(response.data.message)
      localStorage.setItem('id', response.data.data[0].id);
      localStorage.setItem('token', response.data.data[0].token);
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('id'));
      setTimeout(function(){
        navigate('/dashboard')
      }, 3500)
    }else{

      toast.error(response.data.message);
      setIsLoading(false);
    }
  }catch(error){
    toast.error(response.data.message);
    setIsLoading(false);
  }
};

  return (
    < >
            <div className="drop drop1"></div>
            <div className="drop drop2"></div>
            <div className="drop drop3"></div>
            <div className="drop drop4"></div>
      <form onSubmit={handleSubmit}>
        <ToastContainer/>  
        <h1>Connexion</h1>
        <p>Renseignez vos information de connexion pour vous connectez</p>
        <Input 
        label={'email'} 
        reference={'email'} 
        type={'email'} 
        value={email} 
        placeholder={'Saisir l\'adresse e-mail ici...'}
        onChange={ (e) =>{
          setEmail(e.target.value)
        }} 
        />
        <Input 
        label={'Mot de passe'} 
        reference={'password'} 
        type={'password'} 
        value={password} 
        placeholder={'Saisir votre mot de passe ici...'}
        onChange={ (e) =>{
          setPassword(e.target.value)
        }} 
        />
        <div>
        <Button disabled={isLoading} type={'submit'} text={ isLoading? 'changement...':'Soumettre'} />
        <Button type={'reset'} text={'Annuler'} />
        </div>
        <div>
          <Link to={'/registration'}>Inscription</Link>
        </div>
      </form>
    </>
  )
}
