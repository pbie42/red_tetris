import { verifyUrl } from 'client/components/game/utils';

it('should return false for an invalid game url', () => {
  const invalidUrlFormat = 'thisisnotvalid';
  expect(verifyUrl(invalidUrlFormat)).toBeFalsy();
});

it('should return true for an invalid game url', () => {
  const invalidUrlFormat = 'room_name[player_name]';
  expect(verifyUrl(invalidUrlFormat)).toBeTruthy();
});
