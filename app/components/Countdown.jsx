var React = require('react');
var Clock = require('Clock');                   // load clock module
var CountdownForm = require('CountdownForm');   // load form
var Controls = require('Controls');             // Load controls

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
    clearInterval(this.timer)     // clear the timer
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {   // countdown is complete so stop running interval every second
        this.setState({countdownStatus: 'stopped'})
      }
    }, 1000);
  },
  handleSetCountdown: function (seconds) {  // countdown component (container component maintaining state)
    this.setState({                          // can interact with countdown form component
      count: seconds,                        //  update state with whatever is passed in as function argument
      countdownStatus: 'started'             // tell app to start countdown
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render: function () {
    var {count, countdownStatus} = this.state;      // get count from state usng ES6 destructuring
    var renderControlArea = () => {  // render either controls or countdown form
      if (countdownStatus != 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };

    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
