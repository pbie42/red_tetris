import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import Lobby from 'client/components/lobby/Lobby';
import Root from 'client/components/Root';

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

it('has one div and one h1 if username is set', () => {
  const initialState = {
    player: {
      username: 'Paul',
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
