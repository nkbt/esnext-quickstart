'use strict';


const testsContext = require.context('.', true, /-spec$/);
testsContext.keys().forEach(testsContext);


const TestUtils = require('react/lib/ReactTestUtils');
const matchers = require('react-jasmine-matchers');
beforeEach(function () {
  jasmine.addMatchers(matchers(TestUtils));
});
