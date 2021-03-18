import React, { useEffect, useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';

import { UsersTypes } from '../pages/Dashboard';
import api from '../services/api';
import '../styles/components/list-colaborators.css';

const ListColaborators = () => {
  const [users, setUsers] = useState<Array<UsersTypes>>([]);
  const [searchUser, setSearchUser] = useState<Array<UsersTypes>>([]);
  const [search, setSearch] = useState<string>('');
  const [formatView, setFormatView] = useState<string>('');

  useEffect(() => {
    api.get('/user').then(res => {
      setUsers(res.data)
      setSearchUser(res.data);
    }).catch(err => {
      alert('problemas ao carregar usuarios')
    });
  },[])

  function searchEngine(param: string) {
    setSearch(param);
    setSearchUser(users.filter(({name}) => name.match(param)));
  }

  function setView(param: string) {
    setFormatView(param);
  }

  return (
    <div className="list-colaborators-container">
      <h1 className="title" > Listagem de colaboradores</h1>
      <hr />
      <div className="search">
        <select name="order-by" id="order-by" value={formatView} onChange={text => setView(text.target.value)}>
          <option value="">Order by: </option>
          <option value="name">nome</option>
        </select>
        <div className="input">
          <input
            type="text"
            placeholder="Procurar"
            value={search}
            onChange={text => {searchEngine(text.target.value)}}
          />
          <AiOutlineSearch className="search-icon" size={18} color="#888" />
        </div>
      </div>
      <div className="list">
        {
          searchUser? searchUser.map(user => (
            <NavLink to={`/details/${user.id}`} key={user.id} className="colaborator">
              <img src={user.photo} alt={user.name} />
              <p>{user.name}</p>
            </NavLink>
          )):
          <div className="loading-list"></div>
        }
      </div>
    </div>
  );
};

export default ListColaborators;