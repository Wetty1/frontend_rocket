import React, { useState } from 'react';
import './App.css';
import './services/api';

import logo from './assets/logo.svg';

function App() {
  const [email, setEmail] = useState('')

  async function handleSubmit (event) {
    event.preventDefault();
    console.log('Hello world')
    
    const response = await api.post('/sessions', { email })
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>
      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input type="email" id="email" placeholder="Seu melhor e-mail" onChange={event => setEmail}/>
          <button className="btn" type="submit">Entrar</button>
        </form>

      </div>


    </div>
  );
}

export default App;
