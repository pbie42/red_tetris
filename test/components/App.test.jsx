import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Root from 'client/components/Root';
import App from 'client/components/App';
import CommentBox from 'client/components/comment_box/CommentBox';
import Login from 'client/components/login/Login';
import Lobby from 'client/components/lobby/Lobby';

let wrapped;

it('shows a comment box', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/post']}>
        <App />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(CommentBox).length).toEqual(1);
  wrapped.unmount();
});

it('shows the Login component', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Login).length).toEqual(1);
  wrapped.unmount();
});

it('shows the Lobby component', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/lobby']}>
        <App />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(Lobby).length).toEqual(1);
  wrapped.unmount();
});
