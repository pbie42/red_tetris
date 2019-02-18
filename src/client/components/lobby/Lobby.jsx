import React from 'react';
import requireUsername from 'client/components/hoc/requireUsername';

function Lobby() {
  console.log('lobby created');

  return (
    <div>
      <h1>This is the lobby page</h1>
    </div>
  );
}

Lobby.propTypes = {};

export default requireUsername(Lobby, '/');
