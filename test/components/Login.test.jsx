import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router-dom';
import Login from 'client/components/login/Login';
import Root from 'client/components/Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Login />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has one input and one button', () => {
  expect(wrapped.find('input').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(1);
});

describe('the input', () => {
  beforeEach(() => {
    wrapped.find('input').simulate('change', {
      target: {
        value: 'Paul',
      },
    });
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('input').prop('value')).toEqual('Paul');
  });

  it('submits and clears the text area', () => {
    expect(wrapped.find('input').prop('value')).toEqual('Paul');
    wrapped.find('button').simulate('click');
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
  });

  it('displays an error if error exists in store', () => {
    const initialState = {
      player: {
        username: '',
        error: 'The username already exists',
      },
    };
    const errorWrapped = mount(
      <Root initialState={initialState}>
        <Login />
      </Root>,
    );
    expect(errorWrapped.find('h3').text()).toEqual('The username already exists');
    errorWrapped.unmount();
  });

  it('redirects if username exists', () => {
    const initialState = {
      player: {
        username: 'Tom',
        error: '',
      },
    };
    const redirectWrapper = mount(
      <Root initialState={initialState}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </Root>,
    );
    expect(redirectWrapper.find(Redirect).length).toEqual(1);
    redirectWrapper.unmount();
  });
});
