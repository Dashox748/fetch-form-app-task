import React from "react";
import "./App.css";
import MainPage from "./containers/MainPage/MainPage";
import FormPage from "./containers/FormPage/FormPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app__container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/people/:id" element={<MainPage />} />
        <Route path="/form/:id" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
