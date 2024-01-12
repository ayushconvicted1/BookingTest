import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ObjectList from "./components/ObjectList";
import Navbar from "./components/Navbar";
import Shows from "./components/Show";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ObjectList />} />
        <Route path="/show/:id" element={<Shows />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
