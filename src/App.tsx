import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/Login';
import HomePage from './views/Home';
import './App.css';

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App;
