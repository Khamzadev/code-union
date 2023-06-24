import React, { useState } from 'react';
import { logo } from '../../assets/icons';
import './style.css'

const SideBar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className={`sidebar ${isSidebarOpen && "open"}`} >
        <div className="logo-details">
          <img src={logo} alt='logo' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
        <ul className="nav-list">
          <li>
            <a href="#">
              <i class='bx bx-pie-chart-alt' style={{ color: '#9494a0' }}></i>
              <span className="links_name">Аналитика</span>
            </a>
            <span className="tooltip">Аналитика</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-user-circle' style={{ color: '#9494a0' }} ></i>
              <span className="links_name">Профиль</span>
            </a>
            <span className="tooltip">Профиль</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-message-alt-minus' style={{ color: '#9494a0' }}></i>              <span className="links_name">Модерация</span>
            </a>
            <span className="tooltip">Модерация</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-images' style={{ color: '#9494a0' }} ></i>
              <span className="links_name">Баннер</span>
            </a>
            <span className="tooltip">Баннер</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bxl-microsoft-teams' style={{ color: '#9494a0' }}></i>              <span className="links_name">Команда</span>
            </a>
            <span className="tooltip">Команда</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-news' style={{ color: '#9494a0' }} ></i>
              <span className="links_name">Блог</span>
            </a>
            <span className="tooltip">Блог</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-dollar-circle' style={{ color: '#9494a0' }}  ></i>              <span className="links_name">Курс валют</span>
            </a>
            <span className="tooltip">Курс валют</span>
          </li>
          <li>
            <a href="#">
              <i class='bx bx-log-in' style={{ color: '#9494a0' }} ></i>
              <span className="links_name">Выйти</span>
            </a>
            <span className="tooltip">Выйти</span>
          </li>
        </ul>
      </div >

    </>
  );
};

export default SideBar;