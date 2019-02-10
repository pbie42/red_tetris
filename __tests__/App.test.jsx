import React from 'react';
import { shallow } from 'enzyme';
import App from 'src/components/App';
import CommentBox from 'src/components/CommentBox';
import CommentList from 'src/components/CommentList';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

afterEach(() => {
  wrapped.unmount();
});

it('shows a comment box', () => {
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
