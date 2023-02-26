import * as React from "react";
import {  FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignUpPage from "./pages/SignUp/SignUp";
import TNetwork from "./pages/TNetwork/TNetwork";


const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignUpPage/>}/>
        <Route path="/TNetwork" element={<TNetwork/>}/>
      </Routes>
    </HashRouter>
  )
};

export default App;
