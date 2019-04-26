import React from 'react';
import PropTypes from 'prop-types';
import Board from 'client/components/game/Board';

function OtherPlayer({ player, leader }) {
  return (
    <div className="other-container">
      <div className="other-name">
        <div>{player.username}</div>
      </div>
      {Board({ board: player.board, type: 'other' })}
      <div className="other-leader">
        {player.id === leader ? (
          <div>{`Leader Points: ${player.points}`}</div>
        ) : (
          <div>{`Points: ${player.points}`}</div>
        )}
      </div>
    </div>
  );
}

OtherPlayer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    points: PropTypes.number,
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    ),
  }).isRequired,
  leader: PropTypes.string.isRequired,
};

export default OtherPlayer;
