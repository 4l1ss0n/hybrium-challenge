import React, { ChangeEvent, FormEvent, useState } from 'react';
import {AiFillCamera} from 'react-icons/ai';
import { useHistory } from 'react-router';
import api from '../services/api';

import '../styles/components/create-colaborator.css'


const CreateColaborator = () => {
  const history = useHistory()
  const [name,setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [number, setnumber] = useState<string>('');
  const [ocupation, setOcupation] = useState<string>('');
  const [defaultTimeInExpedient, setDefaultTimeInExpedient] = useState<string>('');
  const [defaultTimeOutExpedient, setDefaultTimeOutExpedient] = useState<string>('');
  const [defaultTimeInLunch, setDefaultTimeInLunch] = useState<string>('');
  const [defaultTimeOutLunch, setDefaultTimeOutLunch] = useState<string>('');
  const [photo, setPhoto] = useState<ArrayBuffer | string>();
  const [loading, setLoading] = useState<boolean>(false);


  function handleSelectedPhoto(event: ChangeEvent<HTMLInputElement>) {
    const fileHeader = new FileReader();
    if (!event.target.files) return;
    fileHeader.readAsDataURL(event.target.files[0]);
    fileHeader.onload = () => {
      if(fileHeader.result) {
        setPhoto(fileHeader.result);
      }
    }
  }
  
  function handleGoBack() {
    history.goBack()
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      window.location.replace('http://localhost:3000');
      return;
    }

    if(!(
      name && email && cpf &&
      number && ocupation && defaultTimeInExpedient &&
      defaultTimeOutExpedient && defaultTimeInLunch &&
      defaultTimeOutLunch
    )) {
      alert('registro incompleto');
      return;
    }
    setLoading(true);
    api.post('/user', {
      name,
      cpf,
      email,
      number,
      ocupation,
      defaultTimeInExpedient,
      defaultTimeOutExpedient,
      defaultTimeInLunch,
      defaultTimeOutLunch,
      photo
    }, {
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      if (res.status === 401) {
        window.location.replace('http://localhost:3000');
        return;
      }
      setLoading(false);
      alert('criado');
      history.push('/');
    }).catch(err => {
      setLoading(false);
      console.log(err);
      alert('Problemas interno, entre em contato com o desenvolvedor do site')
    })

  }
  
  return (
    <div className="create-colaborators-container">
      <div className="header-create">
        <div className="header-create-content">
          <h1 className="title">Adicionar colaborador</h1>
          <div className="buttons">
            <button className="btn" onClick={handleGoBack} >Cancelar</button>
            <button className={`btn blue ${loading? 'disable' : ''}`} onClick={handleSubmit} >{
              loading? 
              <div className="loading-view"></div>:
              'Salvar'
            }</button>
          </div>
        </div>
        <hr/>
      </div>

      <form
        className="create-colaborator-view"
        autoComplete="off"
      >
        <div className="input-image-and-name">
          <div className="input-image-view" >
            <label htmlFor="hidden-input-image" className="input-image">
              <AiFillCamera color="#9a9a9a" size={24} />
            </label>
          </div>
          <input
            type="file"
            name="hidden-input-image"
            id="hidden-input-image"
            onChange={handleSelectedPhoto}
          />
          <input
            type="text"
            className="text-input"
            id="name"
            placeholder="Nome do colaborador"
            value={name}
            onChange={text => {setName(text.target.value)}}
          />
        </div>
        <h1 className="information">Informações</h1>
        <div className="cpf-and-email">
          <div className="input-view">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={text => {setCpf(text.target.value)}}
            />
          </div>
          <div className="input-view">
            <label htmlFor="email" >E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Digite o E-mail"
              autoComplete='off'
              value={email}
              onChange={text => setEmail(text.target.value)}
            />
          </div>
        </div>
        <div className="input-view">
          <label htmlFor="number">Telefone</label>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="(xx) x xxxx-xxxx"
            value={number}
            onChange={text => {setnumber(text.target.value)}}
          />
        </div>
        <div className="input-view">
          <label htmlFor="ocupation" className="blue-label">Ocupação</label>
          <input
            type="text"
            name="ocupation"
            id="ocupation"
            placeholder="Ocupação do colaborador"
            value={ocupation}
            onChange={text => setOcupation(text.target.value)}
          />
        </div>
        <div className="times">
          <label className="blue-label">Horário de expediente</label>
          <div className="input-view-h">
            <input
              type="time"
              name="time-in-expedient"
              id="time-in-expedient"
              placeholder="Horário de entrada"
              value={defaultTimeInExpedient}
              onChange={text => {setDefaultTimeInExpedient(text.target.value)}}
            />
            <input
              type="time"
              name="time-out-expedient"
              id="time-out-expedient"
              placeholder="Horário de saída"
              value={defaultTimeOutExpedient}
              onChange={text => {setDefaultTimeOutExpedient(text.target.value)}}
            />
          </div>
        </div>
        <div className="times">
          <label className="blue-label">Horário de almoço</label>
          <div className="input-view-h">
            <input
              type="time"
              name="time-in-lunch"
              id="time-in-lunch"
              placeholder="Horário de entrada"
              value={defaultTimeInLunch}
              onChange={text => {setDefaultTimeInLunch(text.target.value)}}
            />
            <input
              type="time"
              name="time-out-lunch"
              id="time-out-lunch"
              placeholder="Horário de saída"
              value={defaultTimeOutLunch}
              onChange={text => {setDefaultTimeOutLunch(text.target.value)}}
            />
          </div>
        </div>
      </form>

    </div>
  );
};

export default CreateColaborator;