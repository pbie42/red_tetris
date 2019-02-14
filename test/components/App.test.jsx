import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Root from 'client/components/Root';
import App from 'client/components/App';
import CommentBox from 'client/components/comment_box/CommentBox';
import CommentList from 'client/components/comment_list/CommentList';

let wrapped;

it('shows a header with three LIs', () => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Root>,
  );
  expect(wrapped.find('li').length).toEqual(3);
  wrapped.unmount();
});

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
