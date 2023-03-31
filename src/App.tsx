import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import SignIn from './pages/signin';
import Signup from './pages/signup';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Projects from './pages/projects';
import Tickets from './pages/tickets';

function App() {
  useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Tickets />} />

        <Route path="/signin" element={<SignIn />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div> Not found </div>} />
      </Routes>
    </Layout>
  );
}

export default App;
