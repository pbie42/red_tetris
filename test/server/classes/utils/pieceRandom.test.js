import { selectPosition } from 'server/classes/utils/pieceRandom';

it('should return a number >= 0 || a number <= 3', () => {
  expect(selectPosition()).toBeGreaterThanOrEqual(0);
  expect(selectPosition()).toBeLessThanOrEqual(3);
});
