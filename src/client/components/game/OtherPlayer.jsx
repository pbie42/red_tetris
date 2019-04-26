import React from 'react';
import PropTypes from 'prop-types';
import Board from 'client/components/game/Board';
import { handleStatusOther, handleUsername } from 'client/components/game/utils';

function OtherPlayer({
  player,
  leader,
  winner,
  gameIsActive,
}) {
  const status = handleStatusOther(player, winner, gameIsActive);
  console.log('status', status);
  const points = player.id === leader ? (
    <div>{`Leader Points: ${player.points}`}</div>
  ) : (
    <div>{`Points: ${player.points}`}</div>
  );
  return (
    <div className="other-container">
      <div className="other-name">
        <div>{handleUsername(player.username)}</div>
      </div>
      {Board({ board: player.board, type: 'other' })}
      <div className="other-leader">
        { status !== '' ? (
          <div>
            {status}
          </div>
        ) : (
          points
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
  winner: PropTypes.string.isRequired,
  gameIsActive: PropTypes.bool.isRequired,
};

export default OtherPlayer;
