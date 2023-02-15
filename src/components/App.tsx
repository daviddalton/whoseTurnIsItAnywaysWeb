import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import SignInPage from "./SignInPage/SignInPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import NavBar from "./Navigation/NavBar";


function App() {
  return (
      <BrowserRouter>
          <NavBar/>
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
