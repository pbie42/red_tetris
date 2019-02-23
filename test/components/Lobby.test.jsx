import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import Lobby from 'client/components/lobby/Lobby';
import Root from 'client/components/Root';

let wrapped;

describe('The View', () => {
  afterEach(() => {
    wrapped.unmount();
  });

  it('has one div and one h1 if username is set', () => {
    const initialState = {
      game: {
        roomName: '',
      },
      player: {
        username: 'Paul',
        id: '1',
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
    expect(wrapped.find('div').length).toEqual(1);
    expect(wrapped.find('h1').length).toEqual(1);
  });

  it('redirects to login if no username is set', () => {
    const initialState = {
      game: {
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
      game: {
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
    game: {
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
    console.log('wrapped.html()', wrapped.html());
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
