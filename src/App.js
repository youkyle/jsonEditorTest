import React, { Component } from 'react';
import './App.css';
import JsonEditor from './components/JsonEditor/JsonEditor';

class App extends Component {
  
  render() {

    return (
      <div className="App">
          <JsonEditor />
      </div>
    );
  }
}

export default App;
