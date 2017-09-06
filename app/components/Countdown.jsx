var React = require('react');
var Clock = require('Clock');  // load clock module
var CountdownForm = require('CountdownForm');  // load form

var Countdown = React.createClass({
  getInitialState: function () {    // return object where count is zero
    return {count: 0};              // so we have state
  },
  handleSetCountdown: function (seconds) {  // countdown component (container component maintaining state)
    this.setState({                          // can interact with countdown form component
      count: seconds                        //  update state with whatever is passed in as function argument
    });
  },
  render: function () {
    var {count} = this.state;      // get count from state usng ES6 destructuring
    return (
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      </div>
    );
  }
});

module.exports = Countdown;
