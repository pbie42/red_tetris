import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Root from 'Root';
import App from 'components/App';
import { Provider } from 'react-redux';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and add them to the store', (done) => {
  const initialState = {
    comments: ['Comment 1', 'Comment 2'],
  };
  const history = createMemoryHistory('/post');
  const wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter initialEntries={['/post']}>
        <App history={history} />
      </MemoryRouter>
    </Root>,
  );

  wrapped.find('.fetch-comments').simulate('click');
  moxios.wait(() => {
    wrapped.update();
    const { comments } = wrapped
      .find(Provider)
      .prop('store')
      .getState();
    expect(comments.length).toEqual(4);
    done();
    wrapped.unmount();
  });
});
