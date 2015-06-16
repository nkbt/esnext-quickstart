'use strict';


import Content from '../../src/app/Content';


describe('Content', () => {
  it('Should render greetings', () => {
    const content = TestUtils.renderIntoDocument(<Content />);

    const h1 = TestUtils.findRenderedDOMComponentWithTag(content, 'h1');
    expect(h1).toBeDom();
    expect(h1).toHaveText('Hello');
    expect(h1).not.toHaveText('OMG');
  });
});
