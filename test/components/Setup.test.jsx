import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import Setup from 'client/components/setup/Setup';
import Root from 'client/components/Root';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('has one div and one h1 if location state is valid', () => {
  const initialState = {
    player: {
      id: '',
      username: '',
      error: '',
    },
  };
  const initialLocation = {
    state: {
      player: 'Paul',
      room: 'fun',
    },
    pathname: '/setup',
    search: '',
    hash: '',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Setup location={initialLocation} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find('div').length).toEqual(1);
  expect(wrapped.find('h1').length).toEqual(1);
});

it('redirects to login if no location state ', () => {
  const initialState = {
    player: {
      id: '',
      username: '',
      error: '',
    },
  };
  const initialLocation = {
    pathname: '/setup',
    search: '',
    hash: '',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Setup location={initialLocation} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual('/');
});

it('redirects to game if username and roomName state exist ', () => {
  const initialState = {
    player: {
      username: 'Paul',
      id: '1',
      error: '',
    },
    game: {
      roomName: 'Fun',
    },
  };
  const initialLocation = {
    state: {
      player: 'Paul',
      room: 'fun',
    },
    pathname: '/setup',
    search: '',
    hash: '',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Setup location={initialLocation} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual({
    pathname: `/${initialState.game.roomName}[${initialState.player.username}]`,
  });
});

it('redirects to lobby if username exists but location state does not ', () => {
  const initialState = {
    player: {
      username: 'Paul',
      id: '1',
      error: '',
    },
    game: {
      roomName: '',
    },
  };
  const initialLocation = {
    pathname: '/setup',
    search: '',
    hash: '',
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <Setup location={initialLocation} />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Redirect).length).toEqual(1);
  expect(wrapped.find(Redirect).prop('to')).toEqual('/lobby');
});
