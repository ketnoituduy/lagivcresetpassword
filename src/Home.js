// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Chào mừng đến với trang chủ</h1>
      <p>Vui lòng chọn một hành động:</p>
      <ul>
        <li>
          <Link to="/reset-password">Đổi mật khẩu</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;