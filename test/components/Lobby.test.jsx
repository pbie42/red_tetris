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
  });
});

describe('the input', () => {
  const initialState = {
    player: {
      username: 'Paul',
      id: '1',
      error: '',
    },
  };
  // beforeEach(() => {

  // });

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
  });

  // it('displays an error if error exists in store', () => {
  //   const initialState = {
  //     player: {
  //       username: '',
  //       error: 'The username already exists',
  //     },
  //   };
  //   const errorWrapped = mount(
  //     <Root initialState={initialState}>
  //       <Login />
  //     </Root>,
  //   );
  //   expect(errorWrapped.find('h3').text()).toEqual('The username already exists');
  //   errorWrapped.unmount();
  // });

  // it('redirects if username exists', () => {
  //   const initialState = {
  //     player: {
  //       username: 'Tom',
  //       error: '',
  //     },
  //   };
  //   const redirectWrapper = mount(
  //     <Root initialState={initialState}>
  //       <MemoryRouter initialEntries={['/']}>
  //         <Login />
  //       </MemoryRouter>
  //     </Root>,
  //   );
  //   expect(redirectWrapper.find(Redirect).length).toEqual(1);
  //   redirectWrapper.unmount();
  // });
});
