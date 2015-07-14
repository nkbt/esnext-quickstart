import Header from '../../src/app/Header';
import React from 'react/addons';


describe('Header', () => {
  it('Should render logo', () => {
    const header = React.addons.TestUtils.renderIntoDocument(<Header />);
    const a = React.addons.TestUtils.findRenderedDOMComponentWithTag(header, 'a');

    expect(a).toBeDom();
    expect(a).toHaveText('Logo');
  });
});
