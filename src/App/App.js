import React from 'react';

import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Team from '../components/Team/Team';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>INSIDE APP COMPONENT</h2>
        <MyNavbar />
        <Auth />
        <Team />
      </div>
    );
  }
}

export default App;
