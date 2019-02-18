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
