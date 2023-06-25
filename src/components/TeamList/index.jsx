import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/users/usersSlice';
import UserItem from '../UserItem';
import Spinner from '../Spinner';
import ModalPopap from '../ModalPopap';
import './style.css'

const TeamList = () => {
  const { users, isLoading } = useSelector(state => state.users);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="team-list">
      <div className='team-list__top'>
        <h2>Команда</h2>
        <input className='top-input' type='text' placeholder='Поиск по Email' value={searchTerm} onChange={handleSearch} />
        <i className='bx bx-search-alt-2 top-search'></i>
        <button onClick={() => setOpenModal(true)} className='top-btn'>Добавить пользователя</button>
        {openModal && <ModalPopap openModal={openModal} setOpenModal={setOpenModal} />}
      </div>
      <div className='team-list__bottom'>
        {isLoading ? <Spinner /> :
          <>
            {filteredUsers.map(user => <UserItem key={user.id} {...user} />)}
          </>
        }
      </div>
    </div>
  );
};

export default TeamList;
