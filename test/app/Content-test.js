import Content from '../../src/app/Content';
import React from 'react/addons';


describe('Content', () => {
  it('Should render greetings', () => {
    const content = React.addons.TestUtils.renderIntoDocument(<Content />);
    const h1 = React.addons.TestUtils.findRenderedDOMComponentWithTag(content, 'h1');

    expect(h1).toBeDom();
    expect(h1).toHaveText('Hello');
    expect(h1).not.toHaveText('OMG');
  });
});
