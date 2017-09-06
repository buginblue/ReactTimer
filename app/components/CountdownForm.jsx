var React = require('react');

var CountdownForm = React.createClass({
  onSubmit: function (e) {   // takes the event object
      e.preventDefault();    // prevent full browser refresh

      var strSeconds = this.refs.seconds.value;  // value of the ref named seconds - the input field below

      if (strSeconds.match(/^[0-9]*$/)) {        // reg expression define patterns in a string
        this.refs.seconds.value = '';            // if value matches reg expression then clear it
        this.props.onSetCountdown(parseInt(strSeconds, 10));
      }
  },
  render: function () {
    return (
        <div>
          <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
            <input type="text" ref="seconds" placeholder="Enter time in seconds"/>
            <button className="button expanded">Start</button>
          </form>
        </div>
    );
  }
});

module.exports = CountdownForm;
