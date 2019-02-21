import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import Game from 'client/components/game/Game';
import Root from 'client/components/Root';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('has one div and one h1 if url is valid with username set', () => {
  const initialState = {
    player: {
      username: 'Paul',
      error: '',
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
  expect(wrapped.find('div').length).toEqual(1);
  expect(wrapped.find('h1').length).toEqual(1);
});

it('redirects to lobby if url param is invalid for a game but username is set', () => {
  const initialState = {
    player: {
      username: 'Paul',
      error: '',
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
      username: '',
      error: '',
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
      username: '',
      error: '',
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
    state: { player: 'Paul', room: 'testing' },
  });
});
