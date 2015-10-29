import TestUtils from 'react/lib/ReactTestUtils';
import matchers from 'react-jasmine-matchers';


const testsContext = require.context('.', true, /\-test\.js$/);

testsContext.keys().forEach(testsContext);


beforeEach(() => jasmine.addMatchers(matchers(TestUtils)));
