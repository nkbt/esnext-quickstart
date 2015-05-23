'use strict';


const React = require('react');


const Header = require('./Header');
const Content = require('./Content');
const Footer = require('./Footer');


const App = React.createClass({

  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }

});

module.exports = App;
