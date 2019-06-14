import Lobby from 'client/components/lobby/Lobby';
import Root from 'client/components/Root';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';

let wrapped;

describe('The View', () => {
  afterEach(() => {
    wrapped.unmount();
  });

  it('redirects to login if no username is set', () => {
    const initialState = {
      lobby: {
        games: [],
      },
      game: {
        difficulty: 1,
        roomName: '',
      },
      player: {
        username: '',
        id: '',
        error: '',
      },
    };
    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter>
          <Lobby />
        </MemoryRouter>
      </Root>,
    );
    expect(wrapped.find(Redirect).length).toEqual(1);
    expect(wrapped.find(Redirect).prop('to')).toEqual('/');
  });

  it('redirects to game if username and roomName are set', () => {
    const initialState = {
      lobby: {
        games: [],
      },
      game: {
        difficulty: 1,
        roomName: 'Fun',
      },
      player: {
        username: 'Paul',
        id: '',
        error: '',
      },
    };
    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter>
          <Lobby />
        </MemoryRouter>
      </Root>,
    );
    expect(wrapped.find(Redirect).length).toEqual(1);
    expect(wrapped.find(Redirect).prop('to')).toEqual({
      pathname: `/${initialState.game.roomName}[${initialState.player.username}]`,
    });
  });
});

describe('the input', () => {
  const initialState = {
    lobby: {
      games: [],
    },
    game: {
      difficulty: 1,
      roomName: '',
    },
    player: {
      username: 'Paul',
      id: '1',
      error: '',
    },
  };

  it('has a text area that users can type in', () => {
    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter>
          <Lobby />
        </MemoryRouter>
      </Root>,
    );
    wrapped.find('input').simulate('change', {
      target: {
        value: 'Fun',
      },
    });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('Fun');
  });

  it('submits and clears the text area', () => {
    expect(wrapped.find('input').prop('value')).toEqual('Fun');
    wrapped.find('#game-submit').simulate('click');
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
    wrapped.unmount();
  });

  it('does not submit if input value is empty', () => {
    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter>
          <Lobby />
        </MemoryRouter>
      </Root>,
    );
    wrapped.find('input').simulate('change', {
      target: {
        value: '',
      },
    });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
    wrapped.find('#game-submit').simulate('click');
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
    wrapped.unmount();
  });
});
