import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.css'
import { createUser } from '../../redux/users/usersSlice';

const ModalPopap = ({ openModal, setOpenModal }) => {

  const dispatch = useDispatch()

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [showPermissionMenu, setShowPermissionMenu] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter((item) => item !== value));
    }
  };

  const handlePermissionMenuToggle = () => {
    setShowPermissionMenu(!showPermissionMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const userData = {
      name: fullName,
      email: email,
      image: url,
      permissions: permissions
    };

    dispatch(createUser(userData));
    setOpenModal(false)
  };

  return (
    <div className="modal">
      <div className="modal-container" >
        <i className='bx bxs-x-circle icon' onClick={() => setOpenModal(false)} ></i>
        <h4 className='modal-container__title'>Создание нового пользователя</h4>

        <form className="user-form" >
          <label>
            <input placeholder='Ф.И.О' type="text" value={fullName} onChange={handleFullNameChange} />
          </label>
          <br />
          <label>
            <input placeholder='Email' type="email" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            <input placeholder='URL' type="url" value={url} onChange={handleUrlChange} />
          </label>
          <br />
        </form>

        <button className="permission-button" onClick={handlePermissionMenuToggle}>
          Выберите права доступа
          <i className='bx bx-chevron-down' ></i>
        </button>
        {showPermissionMenu && (
          <>
            <div className="permission-menu">
              <label>
                <input
                  type="checkbox"
                  value="Модерация объявлений"
                  checked={permissions.includes('Модерация объявлений')}
                  onChange={handlePermissionChange}
                />
                Модерация объявлений              </label>
              <label>
                <input
                  type="checkbox"
                  value="Блог"
                  checked={permissions.includes('Блог')}
                  onChange={handlePermissionChange}
                />
                Блог
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Тех. поддержка"
                  checked={permissions.includes('Тех. поддержка')}
                  onChange={handlePermissionChange}
                />
                Тех. поддержка
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Обращения клиентов"
                  checked={permissions.includes('Обращения клиентов')}
                  onChange={handlePermissionChange}
                />
                Обращения клиентов
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Аналитика"
                  checked={permissions.includes('Аналитика')}
                  onChange={handlePermissionChange}
                />
                Аналитика
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Акции"
                  checked={permissions.includes('Акции')}
                  onChange={handlePermissionChange}
                />
                Акции
              </label>
            </div>
          </>
        )}
        <button onClick={handleSubmit} className='button' type="submit">Создать</button>
      </div>
    </div>
  );
};

export default ModalPopap;
