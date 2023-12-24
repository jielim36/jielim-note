import React from 'react';
import {BrowserRouter, Routes , Route, RouteProps, Navigate} from "react-router-dom"
import Layout from './component/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import { NoPage } from './pages/NoPage';
import { isAuthenticated } from './helper/auth';
import AuthChecker from './component/AuthChecker/AuthChecker';
import Note from './pages/Note/Note';

function App() {  

  return (
    <BrowserRouter>
      <AuthChecker>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/note/:noteId" element={<Note />} />
              <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </AuthChecker>
    </BrowserRouter>
  );
}

export default App;
