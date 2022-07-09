// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import Bases from '../Bases/Bases';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Bases />} />
      <Route path="/bases" element={<Bases />} />
      <Route path="/recipes/:id" element={<Recipe />} />
    </Routes>
  );
}

export default App;
