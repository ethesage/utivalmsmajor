import React from 'react';
// import { useSelector } from 'react-redux';
import CountSection from './CountSection';
import Layout from '../../../Layouts/HomeGrid';
import './style.scss';

const Home = ({ gapi }) => {

  

  return (
    <main className="dash-con dash-home">
      <Layout>
        <CountSection />
      </Layout>
    </main>
  );
};

export default Home;
