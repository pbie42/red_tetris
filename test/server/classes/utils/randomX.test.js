import randomX from 'server/classes/utils/randomX';

it('should return a number >= 0 || a number <= 7', () => {
  expect(randomX()).toBeGreaterThanOrEqual(0);
  expect(randomX()).toBeLessThanOrEqual(7);
});
