const positionsO = [
  {
    position: 0,
    shape: [[0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  },
  {
    position: 2,
    shape: [[0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  },
];

const positionsL = [
  {
    position: 0,
    shape: [[0, 0, 'l'], ['l', 'l', 'l'], [0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 'l', 0], [0, 'l', 0], [0, 'l', 'l']],
  },
  {
    position: 2,
    shape: [[0, 0, 0], ['l', 'l', 'l'], ['l', 0, 0]],
  },
  {
    position: 3,
    shape: [['l', 'l', 0], [0, 'l', 0], [0, 'l', 0]],
  },
];

const positionsJ = [
  {
    position: 0,
    shape: [['j', 0, 0], ['j', 'j', 'j'], [0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 'j', 'j'], [0, 'j', 0], [0, 'j', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0], ['j', 'j', 'j'], [0, 0, 'j']],
  },
  {
    position: 3,
    shape: [[0, 'j', 0], [0, 'j', 0], ['j', 'j', 0]],
  },
];

const positionsI = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 'i', 0], [0, 0, 'i', 0], [0, 0, 'i', 0], [0, 0, 'i', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 'i', 0, 0], [0, 'i', 0, 0], [0, 'i', 0, 0], [0, 'i', 0, 0]],
  },
];

const positionsS = [
  {
    position: 0,
    shape: [[0, 's', 's'], ['s', 's', 0], [0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 's', 0], [0, 's', 's'], [0, 0, 's']],
  },
  {
    position: 2,
    shape: [[0, 0, 0], [0, 's', 's'], ['s', 's', 0]],
  },
  {
    position: 3,
    shape: [['s', 0, 0], ['s', 's', 0], [0, 's', 0]],
  },
];

const positionsT = [
  {
    position: 0,
    shape: [[0, 't', 0], ['t', 't', 't'], [0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 't', 0], [0, 't', 't'], [0, 't', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0], ['t', 't', 't'], [0, 't', 0]],
  },
  {
    position: 3,
    shape: [[0, 't', 0], ['t', 't', 0], [0, 't', 0]],
  },
];

const positionsZ = [
  {
    position: 0,
    shape: [['z', 'z', 0], [0, 'z', 'z'], [0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 'z'], [0, 'z', 'z'], [0, 'z', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0], ['z', 'z', 0], [0, 'z', 'z']],
  },
  {
    position: 3,
    shape: [[0, 'z', 0], ['z', 'z', 0], ['z', 0, 0]],
  },
];

function getShape(piece, position) {
  switch (piece) {
    case 'o':
      return positionsO.find(p => p.position === position).shape;
    case 'l':
      return positionsL.find(p => p.position === position).shape;
    case 'j':
      return positionsJ.find(p => p.position === position).shape;
    case 'i':
      return positionsI.find(p => p.position === position).shape;
    case 's':
      return positionsS.find(p => p.position === position).shape;
    case 't':
      return positionsT.find(p => p.position === position).shape;
    case 'z':
      return positionsZ.find(p => p.position === position).shape;
    default:
      return null;
  }
}

module.exports = {
  getShape,
  positionsI,
  positionsJ,
  positionsL,
  positionsO,
  positionsS,
  positionsT,
  positionsZ,
};
