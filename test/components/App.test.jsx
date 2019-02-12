import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Root from 'Root';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

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

it('shows a comment list', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find(CommentList).length).toEqual(1);
  wrapped.unmount();
});
