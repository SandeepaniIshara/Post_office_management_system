import React from 'react';
import Header from '../../components/Header/Header';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();


  return (
    <div className='home-container'>
      <Header />
    </div>
  );
};

export default Home;

