import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import SignInPage from "./SignInPage/SignInPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import NavBar from "./Navigation/NavBar";
import StillInPage from "./StillInPage/StillInPage";


function App() {
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/still-in" element={<StillInPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
