import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './canvasDraw/canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Canvas renderFps={10} calcFps={60} />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
