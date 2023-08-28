import React from 'react';
import Homepage from './pages/Homepage';
import Page2 from './pages/Page2';
import SearchPage from './pages/SearchPage';
import GenrePage from './pages/GenrePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Page3" element={<SearchPage />} />
        <Route path="/Page4" element={<GenrePage />} />
      </Routes>
    </>
  )
}

export default App;