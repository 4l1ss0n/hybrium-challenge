import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa';
import {VscListFilter} from 'react-icons/vsc';
import {FiUserPlus, FiBell} from 'react-icons/fi';
import {BsGrid} from 'react-icons/bs';
import { HashRouter, NavLink, Route } from 'react-router-dom';

import '../styles/pages/dashboard.css';

import ListColaborators from '../components/ListColaborators';
import CreateColaborator from '../components/CreateColaborator';
import DetailsColaborator from '../components/DetailsColaborator';

export interface UsersTypes {
  id: string,
  name: string,
  photo: string,
}

export default function Dashboard() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  

  return (
    <HashRouter>
      <div className="dashboard-container">
        <header>
          <button className="bars" onClick={() => {setOpenNav(!openNav)}} >
            <FaBars size={16} color="#aaaaaa" />
          </button>
          <div className="user">
            <div className="notification">
              <FiBell color="#aaaaaa" size={20}/>
            </div>
            <BsGrid color="#aaaaaa" size={20} className="business-details" />
            <p>Hybrium</p>
            <img alt="img" src="https://instagram.ffec12-1.fna.fbcdn.net/v/t51.2885-19/s150x150/103289612_333448614309466_5723762277454385721_n.jpg?tp=1&_nc_ht=instagram.ffec12-1.fna.fbcdn.net&_nc_ohc=WXUWBE_DDuEAX9znYuO&oh=0d8f6b7a1b567e463cb819ef3b73132e&oe=6077A274" />
          </div>
        </header>
        <main>
          <nav className={`navbar ${openNav? '': 'isClosed'}`} >
            <NavLink to="/" className="nav-bar">
              <VscListFilter color="#0066f0" size={30}/>
              <p>Listagem de colaboradores</p>
            </NavLink>
            <hr/>
            <NavLink to="/add" className="nav-bar">
              <FiUserPlus color="#0066f0" size={30}/>
              <p>Adicionar um colaborador</p>
            </NavLink>
          </nav>
          <div className="dashboard-content">
            <Route exact path="/" component={ListColaborators} />
            <Route path="/add" component={CreateColaborator} />
            <Route path="/details/:id" component={DetailsColaborator} />
          </div>
        </main>
      </div>
    </HashRouter>
  );
};