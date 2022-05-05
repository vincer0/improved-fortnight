import React from 'react';

import './App.css';
import { AppBar, Stats, Table } from './components';
import Content from './views/Content';

const App = () => {
  return (
    <div className="App">
      <AppBar />
      <Content>
        <Stats />
        <Table />
      </Content>
    </div>
  );
};

export default App;
