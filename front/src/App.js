import React from 'react';

import './App.css';
import { AppBar } from './components';
import Content from './views/Content';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Content>Hello</Content>
    </div>
  );
};

export default App;
