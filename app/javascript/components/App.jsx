import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='content'>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
