import React from 'react';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  const history = createMemoryHistory('/post');
  wrapped = mount(
    <Root>
      <CommentBox history={history} />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two buttons', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: {
        value: 'New Comment',
      },
    });
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('New Comment');
  });

  it('submits and clears the text area', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('New Comment');
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
