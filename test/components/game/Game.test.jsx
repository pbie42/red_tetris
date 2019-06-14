import Game from 'client/components/game/Game';
import Root from 'client/components/Root';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('redirects to lobby if url param is invalid for a game but username is set', () => {
  const initialState = {
    player: {
      id: '1',
      username: 'Paul',
      error: '',
    },
    game: {
      queue: [],
      active: false,
      difficulty: 1,
      listening: false,
      leader: '',
      players: [],
      id: '',
    },
  };
  const initialMatch = {
    isExact: true,
    params: {
      game: 'testingPaulthis',
    },
    path: '/:game',
    url: '/testingPaulthis',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Game match={initialMatch} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual('/lobby');
});

it('redirects to login if url param is invalid for a game and no username is set', () => {
  const initialState = {
    player: {
      id: '',
      username: '',
      error: '',
    },
    game: {
      queue: [],
      active: false,
      difficulty: 1,
      listening: false,
      leader: '',
      players: [],
      id: '',
    },
  };
  const initialMatch = {
    isExact: true,
    params: {
      game: 'testingPaulthis',
    },
    path: '/:game',
    url: '/testingPaulthis',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Game match={initialMatch} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual('/');
});

it('redirects to setup with player and room name if url is invalid but no username is set', () => {
  const initialState = {
    player: {
      id: '',
      username: '',
      error: '',
    },
    game: {
      queue: [],
      active: false,
      difficulty: 1,
      listening: false,
      leader: '',
      players: [],
      id: '',
    },
  };
  const initialMatch = {
    isExact: true,
    params: {
      game: 'testing[Paul]',
    },
    path: '/:game',
    url: '/testing[Paul]',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Game match={initialMatch} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual({
    pathname: '/setup',
    state: { player: 'Paul', game: 'testing', difficulty: 1 },
  });
});

it('redirects to lobby if game id is not set', () => {
  const initialState = {
    player: {
      id: '1',
      username: 'Paul',
      error: '',
    },
    game: {
      queue: [],
      active: false,
      difficulty: 1,
      listening: false,
      leader: '',
      players: [],
      id: '',
    },
  };
  const initialMatch = {
    isExact: true,
    params: {
      game: 'testing[Paul]',
    },
    path: '/:game',
    url: '/testing[Paul]',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Game match={initialMatch} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual('/lobby');
});
