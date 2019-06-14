import Game from 'server/classes/Game';
import Player from 'server/classes/Player';
import {
  findGamePlayerPiece,
  handleMovePieceDown,
  movePiece,
  verifyGamePlayerPiece,
} from 'server/channels/game/handlers/handleMovement';
import { movePieceRight, movePieceLeft } from 'server/channels/game/movement/movement';
import { Server } from 'mock-socket';

const mockIO = new Server('ws://localhost:8080');

jest.mock('uniqid', () => () => '1');

describe('handleMovement', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
    join: jest.fn(),
  };
  const mockedIO = {
    in: jest.fn(() => ({
      emit: jest.fn(),
    })),
    emit: jest.fn(),
  };
  let games = [];
  const username = 'Paul';
  const username2 = 'Jen';
  const player = new Player(mockSocket.id, username);
  const player2 = new Player(mockSocket.id + 1, username2);
  games.push(new Game('1', 'Fun', [player, player2], 1));
  const nextPiece = games[0].getNextPiece(player2.getCurrent());
  player2.setPiece(nextPiece.getPiece(), nextPiece.currentPosition());

  describe('findGamePlayerPiece', () => {
    it("should return game, player, and player's piece from games array with gameID and playerID", () => {
      const result = findGamePlayerPiece(games, '1', '11');
      expect(result).toEqual({ game: games[0], player: player2, piece: player2.getPiece() });
    });
  });

  describe('verifyGamePlayerPiece', () => {
    it('should return false if game or piece or player do not exist', () => {
      let result = verifyGamePlayerPiece(mockIO, games[3], player2, player2.getPiece());
      expect(result).toBeFalsy();
      result = verifyGamePlayerPiece(mockIO, games[0], undefined, player2.getPiece());
      expect(result).toBeFalsy();
      result = verifyGamePlayerPiece(mockIO, games[0], player2, undefined);
      expect(result).toBeFalsy();
    });

    it('should return false if game is not active', () => {
      games[0].active = false;
      const result = verifyGamePlayerPiece(mockIO, games[0], player2, player2.getPiece());
      expect(result).toBeFalsy();
    });

    it('should return false if player is not active', () => {
      games[0].startGame();
      player2.setActivity(false);
      const result = verifyGamePlayerPiece(mockIO, games[0], player2, player2.getPiece());
      expect(result).toBeFalsy();
    });

    it('should return true if game player piece exist, game and player are active, and piece is not in solid area', () => {
      player2.setActivity(true);
      const result = verifyGamePlayerPiece(mockIO, games, games[0], player2, player2.getPiece());
      expect(result).toBeTruthy();
    });
  });

  describe('handleMovePieceDown', () => {
    player2.setActivity(true);
    games[0].startGame();
    const prevLoc = player2.getPiece().location;
    games = handleMovePieceDown(mockedIO, games, '1', '11');
    const pgp = findGamePlayerPiece(games, '1', '11');
    it('should update the piece location', () => {
      expect(pgp.piece.location).toEqual({ x: prevLoc.x, y: prevLoc.y + 1 });
    });

    it('should update the player map', () => {});
  });

  describe('movePiece', () => {
    it('should move a piece to the left and update the players board that is updated in the games array', () => {
      const prevLoc = player2.getPiece().location;
      const gamesReturned = movePiece(mockedIO, games, '1', '11', movePieceLeft);
      const pgp = findGamePlayerPiece(gamesReturned, '1', '11');
      expect(pgp.piece.location).toEqual({ x: prevLoc.x - 1, y: prevLoc.y });
    });
    it('should move a piece to the left and update the players board that is updated in the games array', () => {
      const prevLoc = player2.getPiece().location;
      const gamesReturned = movePiece(mockedIO, games, '1', '11', movePieceRight);
      const pgp = findGamePlayerPiece(gamesReturned, '1', '11');
      expect(pgp.piece.location).toEqual({ x: prevLoc.x + 1, y: prevLoc.y });
    });
  });
});
