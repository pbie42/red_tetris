const positionsO = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]],
  },
];

const positionsL = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], [0, 0, 'l', 0], ['l', 'l', 'l', 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 'l', 0, 0], [0, 'l', 0, 0], [0, 'l', 'l', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['l', 'l', 'l', 0], ['l', 0, 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], ['l', 'l', 0, 0], [0, 'l', 0, 0], [0, 'l', 0, 0]],
  },
];

const positionsJ = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], ['j', 0, 0, 0], ['j', 'j', 'j', 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 'j', 'j', 0], [0, 'j', 0, 0], [0, 'j', 0, 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['j', 'j', 'j', 0], [0, 0, 'j', 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], [0, 'j', 0, 0], [0, 'j', 0, 0], ['j', 'j', 0, 0]],
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
    shape: [[0, 0, 0, 0], [0, 's', 's', 0], ['s', 's', 0, 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 's', 0, 0], [0, 's', 's', 0], [0, 0, 's', 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 's', 's', 0], ['s', 's', 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], ['s', 0, 0, 0], ['s', 's', 0, 0], [0, 's', 0, 0]],
  },
];

const positionsT = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], [0, 't', 0, 0], ['t', 't', 't', 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 't', 0, 0], [0, 't', 't', 0], [0, 't', 0, 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['t', 't', 't', 0], [0, 't', 0, 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], [0, 't', 0, 0], ['t', 't', 0, 0], [0, 't', 0, 0]],
  },
];

const positionsZ = [
  {
    position: 0,
    shape: [[0, 0, 0, 0], ['z', 'z', 0, 0], [0, 'z', 'z', 0], [0, 0, 0, 0]],
  },
  {
    position: 1,
    shape: [[0, 0, 0, 0], [0, 0, 'z', 0], [0, 'z', 'z', 0], [0, 'z', 0, 0]],
  },
  {
    position: 2,
    shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['z', 'z', 0, 0], [0, 'z', 'z', 0]],
  },
  {
    position: 3,
    shape: [[0, 0, 0, 0], [0, 'z', 0, 0], ['z', 'z', 0, 0], ['z', 0, 0, 0]],
  },
];

module.exports = {
  positionsI,
  positionsJ,
  positionsL,
  positionsO,
  positionsS,
  positionsT,
  positionsZ,
};
