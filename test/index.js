import TestUtils from 'react-addons-test-utils';
import matchers from 'react-jasmine-matchers';


const testsContext = require.context('.', true, /\-test\.js$/);

testsContext.keys().forEach(testsContext);


beforeEach(() => jasmine.addMatchers(matchers(TestUtils)));
