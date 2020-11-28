import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from './Banner';
import Navbar from 'components/NavBar';
import Course from './CourseSection';
import Started from './GetStarted';
import Testimonial from './Testimonial';
import Footer from 'components/Footer';
import './style.scss';

const HomePage = () => {
  return (
    <>
      <main className="home_page">
        <Helmet>
          <title>Utiva Learning Plaform | Home</title>
          <meta name="description" content="" />
        </Helmet>
        <Navbar />

        <Banner />
        <Course />
        <Started />
        <Testimonial />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
