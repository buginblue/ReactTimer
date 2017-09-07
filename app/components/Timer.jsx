var React = require('react');
var Clock = require('Clock');                   // load clock module
var Controls = require('Controls');             // Load controls

var Timer = React.createClass({
  getInitialState: function () {    // return object where count is zero
    return {                        // so we have state
      count: 0,
      timerStatus: 'stopped'        // current status of timer
    };
  },
  componentDidUpdate: function (prevProps, prevState) {  // called whenever props or state updated
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started':
          this.handleStart();
          break;
        case 'stopped':                   // when countdown is stopped
          this.setState({count: 0});     // reset time to zero
        case 'paused':                   //
          clearInterval(this.timer);     // clear the timer
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function () { // fired just before component removed from DOM
    clearInterval(this.timer);     // clear the timer
  },
  handleStart: function () {
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleStatusChange: function (newTimerStatus) {
    this.setState({timerStatus: newTimerStatus});
  },
  render: function () {
    var {count, timerStatus} = this.state;      // get count from state usng ES6 destructuring

    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
