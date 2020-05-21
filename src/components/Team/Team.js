import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';

import Player from '../Player/Player';

import './Team.scss';

class Team extends React.Component {

  state = {
    players: [],
  }

  componentDidMount() {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('could not get the players', err));
  }

  render() {
    const { players } = this.state;
    const sortedPlayers = players.sort((a, b) => a.sequence - b.sequence);
    const buildPlayers = sortedPlayers.map((player) => <Player key={player.id} player={player} />);

    return (
      <div className="Team m-5">
        <h1 className="title">Your 1986-1987 Steaua (The Star) Bucharest</h1>
        <p className="font-italic">Brought to you by SportsRoster, LLC</p>
        <div className="d-flex flex-wrap align-items-center">
          {buildPlayers}
        </div>
      </div>
    );
  }
}

export default Team;
