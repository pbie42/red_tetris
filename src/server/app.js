const io = require('socket.io')();
const { USER_SET, USER_EXISTS } = require('./actions/types');
const Player = require('./classes/Player');

let users = [];
// const rooms = [];
// const result = {};

function userCreate(socket, username, usersArray) {
  if (!usersArray.find(user => user.getUsername() === username)) {
    usersArray.push(new Player(socket.id, username));
    socket.emit('user', { payload: username, type: USER_SET });
  } else {
    socket.emit('user', { payload: username, type: USER_EXISTS });
  }
  return usersArray;
}

io.on('connection', (socket) => {
  console.log('CONNECTED');

  socket.on('disconnect', () => {
    // ------------------------------------------------------------------------DISCONNECTION
    console.log('DISCONNECT');
  });

  socket.on('user', ({ payload, type }) => {
    switch (type) {
      case 'USER_CREATE':
        users = userCreate(socket, payload, users);
        break;

      default:
        break;
    }
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
