import React, { useEffect, useState } from 'react';


import '../styles/components/details-colaborator.css';
import Image from '../assets/image-exemple.jpeg';
import api from '../services/api';
import { useHistory } from 'react-router';

interface UserProps {
  id: string;
  name: string;
  email: string;
  tell: number;
  cpf: number;
  ocupation: string;
  photo: string | null;
  defaultTimeInExpedient: string;
  defaultTimeInLunch:string;
  defaultTimeOutExpedient: string;
  defaultTimeOutLunch:string;
  createdAt: Date
  times: Array<{
    id: number;
    day: string;
    timeInExpedient: string;
    timeOutExpedient: string;
    timeInLunch: string;
    timeOutLunch: string;
  }>
}



const DetailsColaborator = (props: any) => {
  const history = useHistory();
  const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro'];
  const id = props.match.params.id;
  const [user,setUser] = useState<UserProps>();

  function getDate(param: string): {day: string, month: number} {
    const day = param.split('T')[0].split('-')[2];
    const month = param.split('T')[0].split('-')[1];
    return {
      day,
      month: Number(month)
    }
  }

  function checkTime(defaultTime: string, currencyTime: string | null): string | void {
    if (!currencyTime) return '';
    const dTime = defaultTime.split(':').map(item => Number(item));
    const cTime = currencyTime.split(':').map(item => Number(item));
    if (
      (dTime[0]*60 + dTime[1]) !==
      (cTime[0]*60 + cTime[1])
    ){
      return 'yellow'
    }
  }

  function handleInactiveColaborator() {
    api.delete(`/user/${id}`).then(res => {
      alert('inativo');
      history.push('/');
    }).catch(() => {
      alert('problemas ao inativar')
    })
  }

  useEffect(() => {
    api.get(`/user/details?id=${id}`).then(res => {
      setUser(res.data);
    }).catch(err => {
      alert('problemas ao buscar colaborador');
    })

  },[id]);

  if(!user) return (
    <div className="loading-view"></div>
  );

  return (
    <div className="details-colaborators-container">
      <div className="details-header">
        <h1 className="title">Detalhes do colaborador</h1>
        <div className="buttons">
          <button className="btn" onClick={handleInactiveColaborator} >Inativar colaborador</button>
          <button className="btn blue" >Editar colaborador</button>
        </div>
      </div>
      <hr />
      <div className="colaborator-content-view">
        <div className="colaborator-view">
          <div className="header">
            <img src={user.photo || Image} alt="a" />
            <div className="name-and-register-date">
              <p>{user.name}</p>
              <span>Cadastrado em {user.createdAt}</span>
            </div>
          </div>
          <h1 className="informations" >Informação pessoal</h1>
          <div className="pessoal-info">
            <div className="flex-horizontal">
              <div className="info">
                <p>CPF</p>
                <span>{user.cpf}</span>
              </div>
              <div className="info">
                <p>Telefone</p>
                <span>{ user.tell }</span>
              </div>
            </div>
            <div className="info">
              <p>E-mail</p>
              <span>{ user.email }</span>
            </div>
          </div>
          <div className="pessoal-info company">
            <div className="flex-horizontal">
              <div className="info">
                <p>Ocupação</p>
                <span>{ user.ocupation }</span>
              </div>
              <div className="info">
                <p>Horário de expediente</p>
                <span>{ `${user.defaultTimeInExpedient} ás ${user.defaultTimeOutExpedient}` }</span>
              </div>
            </div>
            <div className="info">
              <p>Horário de almoço</p>
              <span>{ `${user.defaultTimeInLunch} ás ${user.defaultTimeOutLunch}` }</span>
            </div>
          </div>
        </div>

        <div className="colaborator-history">
          <h2>Horários de Entrada e Saídas</h2>
          <div className="dates">
            {
              user.times? (
                user.times.map(time => (
                  <div className="date" key={time.id}>
                    <div className="day">
                      <p className="day-number">{ getDate(time.day).day }</p>
                      <p className="day-month">{ month[getDate(time.day).month] }</p>
                    </div>
                    <div className="expedient">
                      <h3>Expediente</h3>
                      <p>
                        <strong>Entrou</strong>
                        <br/>
                        <span
                          className={`${checkTime(user.defaultTimeInExpedient, time.timeInExpedient)}`}
                        >{ time.timeInExpedient }</span>
                      </p>
                      <p>
                        <strong>saiu</strong>
                        <br/>
                        <span
                          className={`${checkTime(user.defaultTimeOutExpedient, time.timeOutExpedient)}`}
                        >
                          {
                            time.timeOutExpedient? time.timeOutExpedient: '--/--'
                          }
                        </span>
                      </p>
                    </div>
                    <div className="lunch">
                      <h3>Almoço</h3>
                      <p>
                        <strong>Entrou</strong>
                        <br/>
                        <span
                          className={`${checkTime(user.defaultTimeInLunch, time.timeInLunch)}`}
                        >
                          {
                            time.timeInLunch? time.timeInLunch: '--/--'
                          }
                        </span>
                      </p>
                      <p>
                        <strong>saiu</strong>
                        <br/>
                        <span
                          className={`${checkTime(user.defaultTimeOutLunch, time.timeOutLunch)}`}
                        >
                          {
                            time.timeOutLunch? time.timeOutLunch: '--/--'
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ): <h3 className="no-times">Nenhum horário cadastrado</h3>
            }
          </div>
        </div> 
      </div>


    </div>
  );
};

export default DetailsColaborator;