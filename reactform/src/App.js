import React, { Component } from 'react';

import './App.css';
import Form from './Form';

class App extends Component {
  render() {
    return (
      <div className='App'>
      <h2 className="header">SignUp Form</h2>
       <Form className="FormStyl" />
      </div>
    );
  }
}

export default App;
