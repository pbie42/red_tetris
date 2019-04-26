export function parseUrl(url) {
  let room = '';
  let player = '';

  let x = 0;
  while (url[x]) {
    if (url[x] === '[') {
      let y = x;
      while (url[y] && url[y + 1] !== ']') {
        y += 1;
        player += url[y];
      }
      x = y + 1;
    }
    if (url[x] === ']') break;
    room += url[x];
    x += 1;
  }
  room = room.replace(/_/g, ' ');
  player = player.replace(/_/g, ' ');
  return { room, player };
}

export function verifyUrl(url) {
  if (url.indexOf('[') < 0 || url.indexOf(']') < 0 || url[url.length - 1] !== ']') return false;
  return true;
}

export function handleUsername(username) {
  if (username.length > 17) {
    return `${username.substring(0, 16)}...`;
  }
  return username;
}

export function handleStatus(player, others, winner, leader, gameIsActive) {
  let status = '';
  if (player && winner === player.id) {
    status = 'is The Winner!';
  } else if (player && gameIsActive && !player.active) {
    status = 'is a Loser!';
  } else if (!player) {
    status = `Points: ${others[4].points}`;
  } else if (player && !player.active && player.id === leader && !gameIsActive) {
    status = 'start the game!';
  } else if (player && !player.active && !gameIsActive) {
    status = 'is waiting';
  }
  return status;
}
