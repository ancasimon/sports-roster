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

  buildTeam = () => {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => this.setState({ players }))
      .catch((err) => console.error('could not get the players', err));
  }

  componentDidMount() {
    this.buildTeam();
  }

  removePlayer = (playerId) => {
    playersData.deletePlayer(playerId)
      .then(() => this.buildTeam())
      .catch((err) => console.error('could not delete a player', err));
  }

  render() {
    const { players } = this.state;
    const sortedPlayers = players.sort((a, b) => a.sequence - b.sequence);
    const buildPlayers = sortedPlayers.map((player) => <Player key={player.id} player={player} removePlayer={this.removePlayer} />);

    return (
      <div className="Team m-3">
        <h1 className="title">Your 1986-1987 Steaua (The Star) Bucharest</h1>
        <p className="font-italic">Brought to you by SportsRoster, LLC</p>
        <img src="https://editorial.uefa.com/resources/0253-0e9c68776703-be743894d14a-1000/famously_the_steaua_team_that_defeated_barcelona_consisted_entirely_of_romanian_players_-_five-goal_forward_victor_piturca_was_the_star_his_highlight_netting_twice_against_anderlecht_in_the_semis.jpeg" className="teamImg" alt="Steaua football team before the game" />
        <p className="white">"We were a team from eastern Europe, with no money, and we achieved so much because we were very good players and formed a very good team," <br />reminisced forward Victor Piturca.<br />"We were Romanian football's golden generation. We won domestic trophies and two European trophies [the European Cup and the 1986 UEFA Super Cup] – the most important ones – and we had continuity at the highest level for five years." <br />That Steaua side claimed five straight titles and four Romanian Cups, and went a record 104 league games unbeaten from 1984 to the December '89 revolution, as well as reaching the 1988 European Cup semis and 1989 final.</p>
        <div className="d-flex flex-wrap align-items-center">
          {buildPlayers}
        </div>
      </div>
    );
  }
}

export default Team;
