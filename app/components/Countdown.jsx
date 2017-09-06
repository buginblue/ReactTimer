var React = require('react');
var Clock = require('Clock');  // load clock module
var CountdownForm = require('CountdownForm');  // load form

var Countdown = React.createClass({
  getInitialState: function () {    // return object where count is zero
    return {                        // so we have state
      count: 0,
      countdownStatus: 'stopped'   // current status of timer
    };

  },
  componentDidUpdate: function (prevProps, prevState) {  // called whenever props or state updated
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
      }
    }
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {  // countdown component (container component maintaining state)
    this.setState({                          // can interact with countdown form component
      count: seconds,                        //  update state with whatever is passed in as function argument
      countdownStatus: 'started'             // tell app to start countdown
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
