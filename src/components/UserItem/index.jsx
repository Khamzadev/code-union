import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLocalUser, updateUser } from '../../redux/users/usersSlice';
import './style.css'

const UserItem = ({ name, email, permissions, image }) => {

  const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);
  const [edit, setEdit] = useState(false)
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUrl, setNewUrl] = useState('')


  const handleMenuToggle = (name) => {
    setShowMenu(name === showMenu ? null : name);
  };

  const handleDelete = () => {
    dispatch(deleteLocalUser(email))
  };

  const handleEdit = () => {
    setEdit(name)
    setNewName(name)
    setNewEmail(email)
    setNewUrl(image)
    setShowMenu(false)
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name: newName,
      email: newEmail,
      permissions: permissions,
      image: newUrl
    };
    await dispatch(updateUser(updatedUser));
    setEdit(false);
  };

  return (
    <div className='user'>
      {
        edit === name ?
          <>
            <form className="update-form" >
              <label>
                <input onChange={(e) => setNewName(e.target.value)} value={newName}
                  placeholder='Ф.И.О' type="text" />
              </label>
              <br />
              <label>
                <input onChange={(e) => setNewEmail(e.target.value)} value={newEmail} placeholder='Email' type="email" />
              </label>
              <label>
                <input onChange={(e) => setNewUrl(e.target.value)} value={newUrl} placeholder='URL' type="url" />
              </label>
              <br />
              <button onClick={saveUser}>Сохранить</button>
            </form>
          </> : <>
            <div className='user-img'>
              <img src={image} alt='user' />
            </div>
            <div className='user-info'>
              <div className='user-info__top'>
                <h3 className='user-title'>{name}</h3>
                <p className='user-gmail'>{email}</p>
              </div>
              <div className='user-info__bottom'>
                {
                  permissions.map(permission => <div key={permission.id} className='user-permission'>{permission}</div>)
                }
              </div>
            </div>
          </>

      }

      <button className='user-button' onClick={() => handleMenuToggle(name)}>
        ...
      </button>
      {showMenu === name && (
        <div className='menu'>
          <p onClick={handleDelete}>Удалить</p>
          <p onClick={handleEdit}>Редактировать</p>
        </div>
      )}
    </div>
  );
};

export default UserItem;