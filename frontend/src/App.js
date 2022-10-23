import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movements from './pages/Movements';
import Population from './pages/Population';
import Map from './pages/Map';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' exact component={Home} /> */}
          {/* <Route path='/' element={<Home/>} /> */}
          <Route path='/' element={<Movements/>} />
          <Route path='/population' element={<Population/>} />
          {/* <Route path='/map' element={<Map/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;