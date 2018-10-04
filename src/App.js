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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="player-container">
          <Canvas renderFps={10} calcFps={60} />
          <video controls="controls" poster="http://www.html5videoplayer.net/poster/toystory.jpg">
              <source src="http://www.html5videoplayer.net/videos/toystory.mp4" type="video/mp4"/>
              <img alt="HTML5 MP4/H.264 Video" src="http://www.html5videoplayer.net/poster/toystory.jpg" width="640" height="360" title="No video playback capabilities, please download the video below"/>
          </video>
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
