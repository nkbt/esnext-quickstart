'use strict';


import Header from '../../src/app/Header';


describe('Header', () => {
  it('Should render logo', () => {
    const header = TestUtils.renderIntoDocument(<Header />);

    const a = TestUtils.findRenderedDOMComponentWithTag(header, 'a');
    expect(a).toBeDom();
    expect(a).toHaveText('Logo');
  });
});
