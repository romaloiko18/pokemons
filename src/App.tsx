import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import SignIn from './pages/signin';
import Signup from './pages/signup';
import { useAuth } from './hooks/useAuth';

function App() {
  useAuth();
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/signin" element={<SignIn />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
