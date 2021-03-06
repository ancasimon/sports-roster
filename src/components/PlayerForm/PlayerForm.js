import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    players: PropTypes.array.isRequired,
    saveNewPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  state = {
    playerName: '',
    playerImageUrl: '',
    playerPosition: '',
    playerSequence: '',
    isEditing: false,
  }

  componentDidMount() {
    const { player } = this.props;
    if (player.name) {
      this.setState({
        playerImageUrl: player.imageUrl,
        playerName: player.name,
        playerPosition: player.position,
        playerSequence: player.sequence,
        isEditing: true,
      });
    }
  }

  playerNameChange = (e) => {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  playerImageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ playerImageUrl: e.target.value });
  }

  playerPositionChange = (e) => {
    e.preventDefault();
    this.setState({ playerPosition: e.target.value });
  }

  savePlayer = (e) => {
    e.preventDefault();
    const { playerName, playerImageUrl, playerPosition } = this.state;
    const { players, saveNewPlayer } = this.props;
    const newPlayer = {
      name: playerName,
      imageUrl: playerImageUrl,
      position: playerPosition,
      uid: authData.getUid(),
      sequence: players.length + 1,
    };
    saveNewPlayer(newPlayer);
  }

  updatePlayer = (e) => {
    e.preventDefault();
    const { player, putPlayer } = this.props;
    const {
      playerImageUrl,
      playerName,
      playerPosition,
      playerSequence,
    } = this.state;
    const updatedPlayer = {
      imageUrl: playerImageUrl,
      name: playerName,
      position: playerPosition,
      uid: authData.getUid(),
      sequence: playerSequence,
    };
    putPlayer(player.id, updatedPlayer);
  }

  render() {
    const {
      playerName,
      playerImageUrl,
      playerPosition,
      isEditing,
    } = this.state;

    return (
      <div>
        <form className="PlayerForm">
          <div className="row">
            <div className="form-group col-4">
              <label htmlFor="playerName" className="largeText"> Player's Name</label>
              <input
                type="text"
                className="form-control"
                id="playerName"
                placeholder="Name"
                value={playerName}
                onChange={this.playerNameChange}
                />
            </div>
            <div className="form-group col-4">
              <label htmlFor="playerImageUrl" className="largeText">Player's Photo</label>
              <input
                type="text"
                className="form-control"
                id="playerImageUrl"
                placeholder="Link to a photo"
                value={playerImageUrl}
                onChange={this.playerImageUrlChange}
                />
            </div>
            <div className="form-group col-4">
              <label htmlFor="playerPosition" className="largeText">Player's Position</label>
              <input
                type="text"
                className="form-control"
                id="playerPosition"
                placeholder="Position on the field"
                value={playerPosition}
                onChange={this.playerPositionChange}
                />
            </div>
          </div>
          {
          isEditing
            ? <button className="btn btn-primary white btn-lg" onClick={this.updatePlayer}>Save Your Changes</button>
            : <button className="btn btn-warning white btn-lg" onClick={this.savePlayer}>Add New Player to the Most Awesome Soccer Team Ever</button>
          }
        </form>
      </div>
    );
  }
}

export default PlayerForm;
