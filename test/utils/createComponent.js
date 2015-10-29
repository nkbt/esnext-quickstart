import React from 'react';
import TestUtils from 'react-addons-test-utils';


function createComponent(component, props, ...children) {
  const shallowRenderer = TestUtils.createRenderer();

  shallowRenderer.render(
    React.createElement(component, props, children.length > 1 ? children : children[0])
  );
  return {shallow: shallowRenderer, out: shallowRenderer.getRenderOutput()};
}


export default createComponent;
