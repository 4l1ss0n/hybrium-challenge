import React, { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../services/api';
import '../styles/pages/landing.css';

export default function Landing() {
  const history = useHistory();
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit() {
    setLoading(true)
    api.get('/admin/login', {
      auth: {
        username: email,
        password
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      setLoading(false);
      history.push('/dashboard');
    }).catch(err => {
      setLoading(false);
      alert('login não completo');
    })
  }

  return (
    <div className="landing-container">
      <div className="background"></div>
      <div className="content-view">
        <section className="text-content-view">
          <div className="titles">
            <h1 className="title">Seja bem-vindo</h1>
            <h2 className="sub-title">Para continuar</h2>
            <h2 className="sub-title">por favor faça login</h2>
          </div>
          <p className="logo">Logotipo</p>
        </section>
        <section className="form-view">
          <h2 className="form-title">Utilize o painel agora mesmo</h2>
          
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite o seu e-mail"
              value={email}
              onChange={ text => setEmail(text.target.value) }
            />
          </div>
          <div className="input">
            <input
              type={`${showPassword? "text": "password"}`}
              name="password"
              id="password"
              placeholder="Digite a sua senha"
              value={password}
              onChange={ text => setPassword(text.target.value) }
            />
            <button onClick={() =>{setShowPassword(!showPassword)}}>
              <i className="far fa-eye" id="togglePassword"></i>
            </button>
          </div>
          <p>Esqueci minha senha.</p>
          <br/>
          <button className={`btn-submit ${loading? 'page-loading': ''}`} onClick={handleSubmit} >
            {
              loading? (
                <div className="loading-view"></div>
              ): 'Enviar'
            }
          </button>
        </section>  
      </div>
      
    </div>
  );
}