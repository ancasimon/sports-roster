import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    removePlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, removePlayer } = this.props;
    removePlayer(player.id);
  }

  render() {
    const { player } = this.props;

    return (
      <div className="Player col-md-3 p-3">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4 d-flex align-items-center">
              <img src={player.imageUrl} className="card-img playerImg" alt="real football player" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{player.name}</h5>
                <h6 className="card-text font-italic">{player.position}</h6>
                <button className="btn btn-danger" onClick={this.deletePlayerEvent}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
