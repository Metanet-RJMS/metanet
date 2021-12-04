import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Marketplace from './pages/Marketplace/Marketplace';
import AddParcel from './pages/AddParcel/AddParcel';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
import Profile from './pages/Profile/Profile';
import Login from './pages/Register/Login/Login';
import SignUp from './pages/Register/SignUp/SignUp';
import Item from './pages/Item/Item';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

export const App = () => {

  const checkJwtExpiration = () => {
    if (!localStorage.jwt) {
      console.log('No JWT present');
    } else {
      console.log('Checking JWT Expiration...')
      const expirationTime = JSON.parse(Buffer.from(localStorage.jwt.split('.')[1], 'base64')).exp;
      const nowTime = Math.floor(new Date().getTime() / 1000);
      const expired = nowTime >= expirationTime;
      console.log(expirationTime);
      console.log(nowTime);
      if (!expired) {
        console.log('JWT valid.');
      } else {
        localStorage.removeItem('jwt');
        console.log('JWT invalid and removed. Log in again.');
      }
    }
  }

  checkJwtExpiration();

  return (
    <>
      {/* <div class="hero-content">
       <video class="Video portrait" loop="" muted="" autoplay="" width="900" height=" 1920" poster="/static/mobile2-c1a5eec113f39cdf51f5dcc03cb3219e.jpg">
          <source src="/static/mobile2-a531873e4a5481a9fe73cb980a2256f3.webm" type="video/webm" />
           <source src="/static/mobile2-af6d461cfec9fc99f8e4e2a94a9747da.mp4" type="video/mp4" />
       </video>
     </div> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/addparcel" element={<AddParcel />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/marketplace/:id" element={<Item />} />
      </Routes>
      <Footer />
    </>
  )
}